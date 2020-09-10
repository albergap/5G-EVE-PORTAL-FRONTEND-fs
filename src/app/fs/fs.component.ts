import { Component, Input } from '@angular/core';

import { User } from './model/user';

@Component({
  selector: 'fs',
  templateUrl: './fs.component.html',
  styleUrls: ['./fs.component.css', '../style.css']
})
export class FsComponent {

  title = '5G-EVE-PORTAL-FRONTEND-fs';

  @Input() user: User;

  tabs: string[] = ['Upload', 'Download'];
  // Booleans for lazy (and only one time) tab loading
  loadTabUpload = false;
  loadTabDownload = true;

  constructor() { }

  tabChange(index: number): void {
    switch (index) {
      case 1:
        if (!this.loadTabUpload) {
          this.loadTabUpload = true;
        }
        break;
      case 0:
        if (!this.loadTabDownload) {
          this.loadTabDownload = true;
        }
        break;
    }
  }

}
