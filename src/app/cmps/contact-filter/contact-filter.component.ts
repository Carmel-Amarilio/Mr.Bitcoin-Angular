import { Component, inject } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { ContactService } from '../../services/contact.service';
import { ContactFilter } from '../../models/contact.model';

@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrl: './contact-filter.component.scss'
})
export class ContactFilterComponent {
  destroySubject$ = new Subject()
  filterSubject$ = new Subject()

  contactService = inject(ContactService)
  filterBy!: ContactFilter


  ngOnInit(): void {
      this.contactService.filterBy$
          .pipe(takeUntil(this.destroySubject$))
          .subscribe(filterBy => {
              this.filterBy = filterBy
          })

      this.filterSubject$
          .pipe(
              debounceTime(500),
              distinctUntilChanged()
          )
          .subscribe(val => {
              this.contactService.setFilter(this.filterBy)
          })


  }

  onSetFilter(val: string) {
      // this.contactService.setFilter(this.filterBy)
      this.filterSubject$.next(val)
  }


  ngOnDestroy(): void {
      this.destroySubject$.next(null)
      this.destroySubject$.complete()
  }
}
