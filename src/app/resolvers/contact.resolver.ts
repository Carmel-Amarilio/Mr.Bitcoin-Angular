import { ResolveFn } from '@angular/router';
import { Contact } from '../models/contact.model';
import { inject } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { delay } from 'rxjs';

export const contactResolver: ResolveFn<Contact> = (route, state) => {
  const id = route.params['id']
  return inject(ContactService).getContactById(id).pipe(delay(100))
};
