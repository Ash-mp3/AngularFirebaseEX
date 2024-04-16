import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { EMPTY, Observable } from 'rxjs';
import { company } from '../../models/company';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  public companies$: Observable<company[]>;

    constructor(private companyService: CompanyService) {
        this.companies$ = EMPTY;
  }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.companies$ = this.companyService.getCompaniesObservable();
  }

}