import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'contact-prev',
  templateUrl: './contact-prev.component.html',
  styleUrl: './contact-prev.component.scss',
})
export class ContactPrevComponent {
  @Input() contact!: Contact;
  @Output() remove = new EventEmitter();

  onRemove() {
    this.remove.emit(this.contact._id);
  }
}
