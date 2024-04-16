import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { company } from '../../models/company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css'],
})
export class CompanyEditComponent implements OnInit {
  company$: Observable<company | undefined>;

  constructor(private db: AngularFirestore, private companyService: CompanyService) {
    this.company$ = this.db.doc<company>('companies/company').valueChanges();
  }

  ngOnInit() {}

  saveCompany(company: any) {
    this.companyService.saveCompany(company);
  }

  editCompany(company: any) {
    this.companyService.editCompany({ phone: '123-123-1234' });
  }

  deleteCompany() {
    this.companyService.deleteCompany();
  }
}
