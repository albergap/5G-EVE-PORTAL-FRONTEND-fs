import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'fs-error-dialog',
  templateUrl: './error-dialog.component.html'
})
export class ErrorDialogComponent {

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

}
