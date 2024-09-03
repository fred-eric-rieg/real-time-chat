import { Injectable, signal, Signal } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private drawerSignal = signal<MatDrawer | null>(null);


  constructor() { }

  // Method to set the MatDrawer instance
  setDrawer(drawer: MatDrawer | null) {
    this.drawerSignal.set(drawer);
  }

  // Method to get the current MatDrawer instance
  getDrawer(): Signal<MatDrawer | null> {
    return this.drawerSignal;
  }
}
