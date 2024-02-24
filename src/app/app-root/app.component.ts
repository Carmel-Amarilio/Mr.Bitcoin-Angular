import { Component } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private contactService: ContactService) { }
  title = 'mr-bitcoin';
  currCmp: string = 'home';

    ngOnInit(): void {
        this.contactService.loadContacts()
            .pipe(take(1))
            .subscribe({
                error: (error) => console.log('error:', error)
            })
    }

  handleHeaderEvent(to: string) {
    this.currCmp = to;
  }
}
