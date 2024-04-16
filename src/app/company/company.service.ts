import { Injectable } from '@angular/core';
import { company } from '../models/company';
import { Observable, from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private companyRef: AngularFirestoreDocument<company>;

  constructor(private db: AngularFirestore) {
    this.companyRef = this.db.doc<company>('companies/company');
  }

  getCompanyObservable(): Observable<company | any> {
    return this.companyRef.valueChanges();
  }

  saveCompany(company: company) {
    // this.companyRef.set(company)
    //   .then(_ => console.log('Success on set'))
    //   .catch(error => console.log('set', error));
    from(this.companyRef.set(company))
      .pipe(
        catchError(error => {
          console.log('set', error);
          return of('Error');
        })
      );
  }

  editCompany(company: any) {
    this.companyRef
      .update(company)
      .then((_) => console.log('Success on update'))
      .catch((error) => console.log('update', error));
  }

  deleteCompany() {
    this.companyRef
      .delete()
      .then((_) => console.log('Success on remove'))
      .catch((error) => console.log('remove', error));
  }
}
