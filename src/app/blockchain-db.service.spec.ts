import { TestBed } from '@angular/core/testing';

import { BlockchainDBService } from './blockchain-db.service';

describe('BlockchainDBService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlockchainDBService = TestBed.get(BlockchainDBService);
    expect(service).toBeTruthy();
  });
});
