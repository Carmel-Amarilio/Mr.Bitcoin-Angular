import { Component, OnInit } from '@angular/core';
import { BitcoinService } from '../../services/bitcoin.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'], // Corrected property name
})
export class HomeComponent implements OnInit {
  rate: number | null = null;

  constructor(private bitcoinService: BitcoinService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.rate = await this.bitcoinService.getRate();
    } catch (error) {
      console.error('Error fetching Bitcoin rate:', error);
    }
  }
}
