import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isSidebarExpanded = false;

  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }

  closeSidebar() {
    this.isSidebarExpanded = false; // Cierra el sidebar
  }
}
