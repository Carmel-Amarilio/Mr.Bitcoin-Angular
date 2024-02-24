import { TestBed } from '@angular/core/testing';

import { UserSericeService } from './user-serice.service';

describe('UserSericeService', () => {
  let service: UserSericeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSericeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
