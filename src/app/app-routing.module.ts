import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactIndexComponent } from './pages/contact-index/contact-index.component';
import { ChartComponent } from './pages/chart/chart.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { authGuard } from './guard/auth.guard';
import { contactResolver } from './resolvers/contact.resolver';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path: 'contact', component: ContactIndexComponent},
  { path: 'edit/:id', component: ContactEditComponent, resolve: { contact: contactResolver }},
  { path: 'edit', component: ContactEditComponent },
  { path: 'contact/:id', component: ContactDetailsComponent , canActivate: [authGuard], resolve: { contact: contactResolver } },
  { path: 'chart', component: ChartComponent},

  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
