/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataAppService } from './dataApp.service';

describe('Service: DataApp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataAppService]
    });
  });

  it('should ...', inject([DataAppService], (service: DataAppService) => {
    expect(service).toBeTruthy();
  }));
});
