import { TestBed } from '@angular/core/testing';

import { HeroDetailsGuard } from './hero-details.guard';

describe('HeroDetailsGuard', () => {
  let guard: HeroDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HeroDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
