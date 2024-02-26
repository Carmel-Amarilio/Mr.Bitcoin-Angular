import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserSericeService } from '../../services/user-serice.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss',
})
export class ContactDetailsComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  userService = inject(UserSericeService);
  loggedInUser$: Observable<User | null> = this.userService.loggedInUser$;
  isTransfer = false;
  transferAmount: number = 0;

  contact$ = this.route.data.pipe(map((data) => data['contact']));

  ngOnInit() {
    console.log(this.contact$);
  }

  onTransfer() {
    console.log(this.isTransfer);

    this.isTransfer = !this.isTransfer;
  }

  onSend() {
    this.contact$.subscribe((contact) => {
      if (!contact) return console.error('Contact details not available');

      this.loggedInUser$.subscribe((loggedInUser) => {
        if (!loggedInUser) return console.error('User not logged in');

        if (
          loggedInUser.balance < this.transferAmount ||
          this.transferAmount <= 0
        ) {
          console.error('Insufficient balance or invalid transfer amount');
          return;
        }

        const transaction = {
          toId: contact._id,
          to: contact.name,
          at: Date.now(),
          amount: this.transferAmount,
        };
        loggedInUser.transactions.unshift(transaction);
        loggedInUser.balance -= this.transferAmount;
        console.log(loggedInUser);

        try {
          this.userService.saveUser(loggedInUser)
          this.router.navigate(['/home']);
        } catch (error) {
          console.log(error);
        }
      });
    });
  }
}
