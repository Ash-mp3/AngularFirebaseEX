import { Injectable } from '@angular/core';
import { contact } from '../models/contact';
import { Observable, catchError, from, map, of, throwError } from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, CollectionReference, DocumentChangeAction} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactRef: AngularFirestoreDocument<contact>;
  private contactsRef: AngularFirestoreCollection<contact>;

  constructor(private db: AngularFirestore) {
    this.contactRef = this.db.doc<contact>('contacts/contact');
    this.contactsRef = this.db.collection<contact>('contacts');
  }

  getContactsObservable(companyId: string): Observable<contact[]> {
    console.log('companyId', companyId);
    const filteredContacts = companyId != null ?
      this.db.collection<contact>('contacts', (ref: CollectionReference) => ref.where('companyId', '==', companyId))
      : this.contactsRef;

    return filteredContacts.snapshotChanges()
      .pipe(
        map((items: DocumentChangeAction<contact>[]): contact[] => {
          return items.map((item: DocumentChangeAction<contact>): contact => {
            return {
              id: item.payload.doc.id,
              companyId: item.payload.doc.data().companyId,
              name: item.payload.doc.data().name,
              phone: item.payload.doc.data().phone
            };
          });
        }),
        catchError(this.errorHandler)
      );
  }


  getContactObservable(id: string | null): Observable<contact | undefined> {
    return this.db.doc<contact>(`contacts/${id}`).valueChanges()
    .pipe(                          // <-- new
      catchError(this.errorHandler) // <-- new
    );                              // <-- new;
  }

  saveContact(contact: contact) {
    console.log('contact', contact);
    return this.contactsRef.add(contact)
      .then(_ => console.log('success on add'))
      .catch(error => console.log('add', error));
  }

  editContact(contact: contact) {
    console.log('contact', contact);
    return this.contactsRef.doc(contact.id).update(contact)
      .then(_ => console.log('Success on update'))
      .catch(error => console.log('update', error));
  }

  deleteContact(id: string) {
    return this.contactsRef.doc(id).delete()
      .then(_ => console.log('Success on delete'))
      .catch(error => console.log('delete', error));
  }

  private errorHandler(error) {
    console.log(error);
    return throwError(error);
  }

}

