import { TestBed, inject } from '@angular/core/testing';

import { MainAppService } from './main-app.service';

describe('MainAppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainAppService]
    });
  });

  it('should be created', inject([MainAppService], (service: MainAppService) => {
    expect(service).toBeTruthy();
  }));
});
