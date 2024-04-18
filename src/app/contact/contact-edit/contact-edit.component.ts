import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { contact } from '../../models/contact';
import { ContactService } from '../contact.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CompanyService } from '../../company/company.service';
import { company } from '../../models/company';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  contact$: Observable<contact | undefined> ;
  companies$: Observable<company[]>;

  constructor(
    private contactService: ContactService,
    private companyService: CompanyService, 
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
      this.companies$ = companyService.getCompaniesObservable();
      if (!this.isNew) {
        this.contact$ = contactService.getContactObservable(this.id);
      } else {
        this.contact$ = of({}) as Observable<contact>;
      }
  }

  ngOnInit() {}

  editContact(contact: contact) {
    this.contactService.editContact({
      name: contact.name,
      phone: '123-456-7890',
      id: this.id,
      companyId: contact.companyId
    }).then(_ => this.router.navigate(['/contact/all']));
  }

  saveContact(contact: contact) {
    this.contactService.saveContact({
      name: contact.name,
      companyId: contact.companyId
    }).then(_ => this.router.navigate(['/contact/all']));
  }
  
  deleteContact() {
    this.contactService.deleteContact(this.id)
      .then(_ => this.router.navigate(['/contact/all']));
  }

  getRandomId(): string {
    return Math.random().toString(36).substring(2);
  }

  get id(): string {
    if (!this.activatedRoute.snapshot.paramMap.has('id')) {
      return 'new';
    }

    return this.activatedRoute.snapshot.paramMap.get('id');
    
  }

  get isNew(): boolean {
    return this.id === 'new';
  }

}
