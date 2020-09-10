import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { UploadService } from './../../services/upload.service';

@Component({
  selector: 'fs-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css', '../../../style.css']
})
export class UploadComponent implements OnInit {

  formUpload: FormGroup;

  file: File;
  fileS = '';
  sites: string[] = [];

  constructor(fBuilder: FormBuilder, private apiFS: UploadService) {
    this.formUpload = fBuilder.group({
      file: [null, Validators.required],
      name: ['', Validators.required],
      site: ['']
    }
    );
  }

  ngOnInit(): void {
  }

  newSite(): void {
    const s = '' + this.formUpload.get('site').value;
    if (s.length > 0 && (this.sites.indexOf(s) === -1)) {
      this.sites.push(s);
    }
  }
  removeSite(s): void {
    this.sites.splice(s, 1);
  }

  onFileChange(event): void {
    this.file = event.target.files[0];
    this.fileS = '' + this.file.name;
  }

  submit(): void {
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('dzuuid', this.formUpload.get('name').value);
    if (this.sites.length > 0) {
      formData.append('List<site>', this.sites.toString());
    }

    // TODO
    console.log(formData);

    this.apiFS.upload(formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

}
