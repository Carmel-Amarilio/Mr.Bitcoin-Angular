import { Component, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, filter, map, takeUntil } from 'rxjs';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.scss',
})
export class ContactEditComponent {
  destroySubject$ = new Subject<void>();
  router = inject(Router);
  route = inject(ActivatedRoute)
  contactService = inject(ContactService);
  contact = this.contactService.getEmptyContact();

  ngOnInit(): void {
    this.route.data
      .pipe(
        map((data) => data['contact']),
        filter((contact) => contact)
      )
      .subscribe((contact) => (this.contact = contact));
  }

  onSaveContact() {
    this.contactService
      .saveContact(this.contact as Contact)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe({
        next: this.onBack,
        error: (err) => console.log('err:', err),
      });
  }

  onBack = () => {
    this.router.navigateByUrl('/contact');
  };
}
