import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from './fs/model/user';

import { RBACService } from './fs/services/rbac.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ErrorDialogComponent } from './fs/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './style.css']
})
export class AppComponent {

  title = 'Welcome to FS component';

  form: FormGroup;

  logging: boolean;
  loged: boolean;

  user: User;

  // TODO debug login
  users: User[];
  clickUser(u: User): void {
    this.user = u;
    this.logIn();
  }

  constructor(private fBuilder: FormBuilder,
    private apiRBAC: RBACService, private dialog: MatDialog) {
    this.loged = false;
    this.user = new User('', '');
    this.form = fBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // TODO debug login
    this.users = [
      new User('user@mail.com', 'pass'),
      new User('admin@mail.com', 'admin')
    ];
    this.user = this.users[0];
    this.logIn();
  }

  submit(): void {
    this.user.email = this.form.get('email').value;
    this.user.password = this.form.get('password').value;
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
