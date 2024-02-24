import { Component } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { BitcoinService } from '../../services/bitcoin.service';

interface Data {
  x: number;
  y: number;
}

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})

export class ChartComponent {
  constructor(private bitcoinService: BitcoinService) {}

  avgBlockSize: Data[] | null = null;
  marketPriceHistory: Data[] | null = null;
  chart1: any = {};
  chart2: any = {};

  async ngOnInit(): Promise<void> {
    try {
      this.avgBlockSize = await this.bitcoinService.getAvgBlockSize();
      this.marketPriceHistory = await this.bitcoinService.getMarketPriceHistory();
      this.initializeChart();
    } catch (error) {
      console.error('Error fetching Bitcoin rate:', error);
    }
  }

  initializeChart(): void {
    this.chart1 = {
      title: 'Avg Block Size',
      data: this.formData(this.avgBlockSize),
      type: ChartType.Line,
      columnNames: ['Date', 'Block'],
    };
    this.chart2 = {
      title: 'Market Price History',
      data: this.formData(this.marketPriceHistory),
      type: ChartType.Line,
      columnNames: ['Date', 'Market'],
    };
  }

  formData(data: Data[] | null): Array<[string, number]> | null {
    if (!data) return null;
    const newData: Array<[string, number]> = [];
    data.forEach((d) => newData.push([this.formatTimestamp(d.x), d.y]));
    return newData;
  }

  formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear().toString().slice(-2);

    return `${day}/${month}/${year}`;
  }
}
