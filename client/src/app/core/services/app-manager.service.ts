import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppManagerService {
  title: string;

  constructor() {
    this.title = 'Nexus';
  }
}
