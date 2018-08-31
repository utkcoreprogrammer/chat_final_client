import { TestBed, inject } from '@angular/core/testing';

import { ChangeHeaderService } from './change-header.service';

describe('ChangeHeaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangeHeaderService]
    });
  });

  it('should be created', inject([ChangeHeaderService], (service: ChangeHeaderService) => {
    expect(service).toBeTruthy();
  }));
});
