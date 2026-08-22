import { TestBed } from '@angular/core/testing';

import { MasterServ } from './master-serv';

describe('MasterServ', () => {
  let service: MasterServ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterServ);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
