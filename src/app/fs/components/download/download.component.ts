import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';

import { ListService } from './../../services/list.service';
import { DownloadService } from './../../services/download.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'fs-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css', '../../../style.css']
})
export class DownloadComponent implements OnInit {

  form: FormGroup;

  files: string[];
  loadingList: boolean;
  downloading: boolean;

  constructor(fBuilder: FormBuilder, private listService: ListService,
    private downloadService: DownloadService, private dialog: MatDialog) {
    this.form = fBuilder.group({
      name: ['', Validators.required]
    }
    );
  }

  loadList(): void {
    this.loadingList = true;
    this.listService.list().subscribe(
      files => this.files = files,
      (err: HttpErrorResponse) => this.listError(err),
      () => this.loadingList = false
    );
  }

  ngOnInit(): void {
    this.loadList();
  }

  listError(error: HttpErrorResponse): void {
    this.loadingList = false;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Error listing files',
      text: 'Status:' + error.status + ', ' + error.message,
      buttonText: 'Retry'
    };

    const dialog = this.dialog.open(ErrorDialogComponent, dialogConfig);

    dialog.afterClosed().subscribe(
      result => {
        if (result === 'Retry') {
          this.loadList();
        }
      }
    );
  }

  clickListFile(file: string): void {
    this.form.get('name').setValue(file);
  }

  download(): void {
    let file = this.form.get('name').value;
    this.downloading = true;

    this.downloadService.download(file).subscribe(
      downloadResponse => file = downloadResponse,
      (err: HttpErrorResponse) => this.downloadError(err),
      () => this.downloaded(file)
    );
  }

  downloaded(file: string): void {
    this.downloading = false;
    console.log('Downloaded:' + file);
    // TODO
  }

  downloadError(error: HttpErrorResponse): void {
    this.downloading = false;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Error downloading the file',
      text: 'Status:' + error.status + ', ' + error.message,
      buttonText: 'Retry'
    };

    const dialog = this.dialog.open(ErrorDialogComponent, dialogConfig);

    dialog.afterClosed().subscribe(
      result => {
        if (result === 'Retry') {
          this.download();
        }
      }
    );
  }

}
