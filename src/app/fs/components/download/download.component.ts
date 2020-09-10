import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';

import { ListService } from './../../services/list.service';
import { DownloadService } from './../../services/download.service';

@Component({
  selector: 'fs-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css', '../../../style.css']
})
export class DownloadComponent implements OnInit {

  form: FormGroup;

  files: string[];
  loadingDownloadList: boolean;

  constructor(fBuilder: FormBuilder, private listService: ListService, private downloadService: DownloadService) {
    this.form = fBuilder.group({
      name: ['', Validators.required]
    }
    );

    this.loadingDownloadList = true;
    listService.list().subscribe(
      files => this.files = files,
      (err: HttpErrorResponse) => console.log(err.message),
      () => this.loadingDownloadList = false
    );
  }

  ngOnInit(): void {
  }

  clickFile(file: string): void {
    this.form.get('name').setValue(file);
    console.log('click ' + file);
  }

  download(): void {
    let file = this.form.get('name').value;
    console.log('download: ' + file);

    // TODO
    this.downloadService.download(file).subscribe(
      downloadResponse => {
        file = downloadResponse;
        console.log(file);
      },
      (err: HttpErrorResponse) => console.log(err.status + ', ' + err.message)
    );
  }

}
