import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent {
  @Output() navTo = new EventEmitter()

  onNav(to :string){
    this.navTo.emit(to)
  }
}
