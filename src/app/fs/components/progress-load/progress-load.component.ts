import { Component, Input } from '@angular/core';

@Component({
  selector: 'fs-progress-load',
  templateUrl: './progress-load.component.html',
  styleUrls: ['./progress-load.component.css']
})
export class ProgressLoadComponent {

  @Input() text: string;

  constructor() { }

}
