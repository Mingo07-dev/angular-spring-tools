import { TestBed } from '@angular/core/testing';

import { IdraPageService } from './idra-page.service';

describe('IdraPageService', () => {
  let service: IdraPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdraPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
