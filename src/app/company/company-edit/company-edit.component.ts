import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { company } from '../../models/company';
import { CompanyService } from '../company.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css'],
})
export class CompanyEditComponent implements OnInit {
  company$: Observable<company | undefined> | undefined;
  id: string | null;
  isNew: boolean | undefined;

  constructor(
    private db: AngularFirestore,
    private companyService: CompanyService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = '';
    this.isNew = false;
  }

  ngOnInit() {
    this.ActivatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    if (this.id === 'new') {
      this.isNew = true;
      const newCompany = {
        name: '',
      };
      this.company$ = of(newCompany);
    } else {
      this.company$ = this.db
        .doc<company>(`companies/${this.id}`)
        .valueChanges();
    }
  }

  saveCompany(company: any) {
    this.companyService
      .saveCompany(company, this.id)
      .then((_) => this.router.navigate(['/company/all']));
  }

  editCompany(company: any) {
    this.companyService
      .editCompany(company, this.id)
      .then((_) => this.router.navigate(['/company/all']));
  }

  deleteCompany() {
    this.companyService
      .deleteCompany(this.id)
      .then((_) => this.router.navigate(['/company/all']));
  }
}
