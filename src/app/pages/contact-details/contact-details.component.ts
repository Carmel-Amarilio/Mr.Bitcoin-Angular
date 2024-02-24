import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent {
  private route = inject(ActivatedRoute)

  contact$ = this.route.data.pipe(map(data => data['contact']))

  ngOnInit() {
    console.log(this.contact$);
    
  }
}
