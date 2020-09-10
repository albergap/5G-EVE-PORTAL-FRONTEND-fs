import { ErrorDialogComponent } from './fs/components/error-dialog/error-dialog.component';
import { Component, OnInit } from '@angular/core';

import { User } from './fs/model/user';

import { RBACService } from './fs/services/rbac.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './style.css']
})
export class AppComponent implements OnInit {

  title = 'Welcome to FS component';

  logging: boolean;
  loged: boolean;

  user: User;

  constructor(private apiRBAC: RBACService, private dialog: MatDialog) {
    this.loged = false;
    // Login param
    this.user = new User('user@mail.com', 'pass');
    // this.user = new User('admin@mail.com', 'admin');
  }

  ngOnInit(): void {
    this.logIn();
  }

  logIn(): void {
    this.logging = true;
    this.apiRBAC.login(this.user).subscribe(
      loginResponse => {
        this.user.setTokens(loginResponse.access_token, loginResponse.refresh_token);
        localStorage.setItem('token', loginResponse.access_token);
      },
      (error: HttpErrorResponse) => this.logError(error),
      () => this.start()
    );
  }

  logError(error: HttpErrorResponse): void {
    this.logging = false;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Error logging in',
      text: error.message,
      buttonText: 'Retry'
    };

    const dialog = this.dialog.open(ErrorDialogComponent, dialogConfig);

    dialog.afterClosed().subscribe(
      result => {
        if (result === 'Retry') {
          this.logIn();
        }
      }
    );
  }

  start(): void {
    this.logging = false;
    this.loged = true;
  }

}
