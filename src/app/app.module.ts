import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { ContactIndexComponent } from './pages/contact-index/contact-index.component';
import { ContactListComponent } from './cmps/contact-list/contact-list.component';
import { ContactPrevComponent } from './cmps/contact-prev/contact-prev.component';
import { ContactFilterComponent } from './cmps/contact-filter/contact-filter.component';
import { HomeComponent } from './pages/home/home.component';
import { ChartComponent } from './pages/chart/chart.component';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    ContactIndexComponent,
    ContactListComponent,
    ContactPrevComponent,
    ContactFilterComponent,
    HomeComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GoogleChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
