import { TestBed } from '@angular/core/testing';

import { RBACService } from './rbac.service';

describe('RBACService', () => {
  let service: RBACService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RBACService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
