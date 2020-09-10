import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressLoadComponent } from './progress-load.component';

describe('ProgressLoadComponent', () => {
  let component: ProgressLoadComponent;
  let fixture: ComponentFixture<ProgressLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
