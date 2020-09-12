import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { UploadService } from './../../services/upload.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'fs-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css', '../../../style.css']
})
export class UploadComponent {

  form: FormGroup;

  file: File;
  fileUser: string;
  sites: string[];

  uploading: boolean;

  constructor(fBuilder: FormBuilder, private apiFS: UploadService,
    private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.reset();
    this.form = fBuilder.group({
      file: [null, Validators.required],
      name: ['', Validators.required],
      site: ['']
    });
  }

  reset(): void {
    this.file = null;
    this.fileUser = '';
    this.sites = [];
  }

  newSite(): void {
    const s = '' + this.form.get('site').value;
    if (s.length > 0 && (this.sites.indexOf(s) === -1)) {
      this.sites.push(s);
    }
  }
  removeSite(s): void {
    this.sites.splice(s, 1);
  }

  onFileChange(event): void {
    this.file = event.target.files[0];
    this.fileUser = '' + this.file.name;
  }

  upload(): void {
    this.uploading = true;

    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('dzuuid', this.form.get('name').value);
    if (this.sites.length > 0) {
      formData.append('List<site>', this.sites.toString());
    }

    this.apiFS.upload(formData).subscribe(
      response => console.log('Uploaded ' + this.form.get('name').value),
      (err: HttpErrorResponse) => this.uploadError(err),
      () => this.uploaded()
    );
  }

  uploaded(): void {
    this.uploading = false;

    this.form.reset();
    this.reset();

    this.snackBar.open('Uploaded correctly', null, { duration: 2000 });
  }

  uploadError(error: HttpErrorResponse): void {
    this.uploading = false;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Error uploading the file',
      text: 'Status:' + error.status + ', ' + error.message,
      buttonText: 'Retry'
    };

    const dialog = this.dialog.open(ErrorDialogComponent, dialogConfig);

    dialog.afterClosed().subscribe(
      result => {
        if (result === 'Retry') {
          this.upload();
        }
      }
    );
  }

}
