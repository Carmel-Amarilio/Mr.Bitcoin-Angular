import { Component, OnInit, inject } from '@angular/core';
import { BitcoinService } from '../../services/bitcoin.service';
import { UserSericeService } from '../../services/user-serice.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'], // Corrected property name
})
export class HomeComponent implements OnInit {
  userService = inject(UserSericeService);
  loggedInUser$: Observable<User | null> = this.userService.loggedInUser$;
  rate: number | null = null;
  name: string = '';

  constructor(private bitcoinService: BitcoinService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.rate = await this.bitcoinService.getRate();
    } catch (error) {
      console.error('Error fetching Bitcoin rate:', error);
    }
  }

  onLogIn() {
    this.userService.logIn(this.name)
  }

  onLogOut() {
    this.userService.logOut()
  }

  formTime(timestamp: number) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
}
