import { Component } from '@angular/core';
import { MdcDialogRef } from '@angular-mdc/web';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  templateUrl: './app-picker.component.html',
  styleUrls: ['./app-picker.component.scss']
})
export class AppPickerComponent {
  apps = [
    // Row 1
    new App('Home', '/'),
    new App('ClickUp', '/clickup'),
    new App('Spotify', '/spotify'),
    // new App('Spotify', '/spotify'),
    // Row 2
    // new App('App', '/'),
    // new App('App', '/'),
    // new App('App', '/'),
    // new App('App', '/'),
    // Row 3
    // new App('App', '/'),
    // new App('App', '/'),
    // new App('App', '/'),
    // new App('App', '/'),
  ];

  activeAppLink: string | null;

  constructor(public dialogRef: MdcDialogRef<AppPickerComponent>, private router: Router, public location: Location) { }

  openApp(link: string) {
    this.router.navigate([link])
      .finally(() => this.dialogRef.close());
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

class App {
  constructor(public name: string, public link: string) {
    // TODO: Image
  }
}