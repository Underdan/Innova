import { TestBed } from '@angular/core/testing';

import { ServicesuserServiceService } from './servicesuser-service.service';

describe('ServicesuserServiceService', () => {
  let service: ServicesuserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesuserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
