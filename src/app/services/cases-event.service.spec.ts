import { TestBed } from '@angular/core/testing';

import { CasesEventService } from './cases-event.service';

describe('CasesEventService', () => {
  let service: CasesEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasesEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
