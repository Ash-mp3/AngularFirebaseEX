import { Injectable } from '@angular/core';
import { company } from '../models/company';
import { Observable, from, of, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private companyRef: AngularFirestoreDocument<company>;
  private companiesRef: AngularFirestoreCollection<company>;

  constructor(private db: AngularFirestore) {
    this.companyRef = this.db.doc<company>('companies/company');
    this.companiesRef = this.db.collection<company>('companies');
  }

  getCompaniesObservable(): Observable<company[]> {
    return this.companiesRef.snapshotChanges().pipe(
      map((items: DocumentChangeAction<company>[]): company[] => {
        return items.map((item: DocumentChangeAction<company>): company => {
          return {
            id: item.payload.doc.id,
            name: item.payload.doc.data().name,
            phone: item.payload.doc.data().phone,
          };
        });
      })
    );
  }

  getCompanyObservable(): Observable<company | any> {
    return this.companyRef.valueChanges();
  }

  saveCompany(company: company, id: any) {
    this.companiesRef
      .add({ name: company.name })
      .then((_) => console.log('success on add'))
      .catch((error) => console.log('add', error));
  }

    editCompany(company: company, id: any) {
    this.companiesRef
      .doc(id)
      .update({ name: company.name })
      .then((_) => console.log('Success on update'))
      .catch((error) => console.log('update', error));
  }

    deleteCompany(company: company, id: any) {
      this.companiesRef
        .doc(id)
        .delete()
        .then((_) => console.log('Success on remove'))
        .catch((error) => console.log('remove', error));
  }
}
