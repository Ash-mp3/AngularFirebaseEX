import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { EMPTY, Observable } from 'rxjs';
import { contact } from '../../models/contact';
import { CompanyService } from '../../company/company.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

    public contacts$: Observable<contact[]>;
    public companies$: Observable<contact[]>;

    constructor(
        private contactService: ContactService,
        private companyService: CompanyService
    ) {
      this.contacts$ = EMPTY;
      this.companies$ = companyService.getCompaniesObservable();
  }

  ngOnInit() {
    this.getContacts();
  }
  getContacts(companyId: string = null) {
    this.contacts$ = this.contactService.getContactsObservable(companyId);
    this.contacts$.subscribe(contacts => console.log('contacts', contacts));
  }

}