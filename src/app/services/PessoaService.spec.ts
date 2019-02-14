import { TestBed } from '@angular/core/testing';

import { PessoaServiceService } from './PessoaService.service';

describe('PessoaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PessoaServiceService = TestBed.get(PessoaServiceService);
    expect(service).toBeTruthy();
  });
});
