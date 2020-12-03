import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { HeroDetailGuard } from './hero-detail.guard';

describe('HeroDetailGuard', () => {
  let guard: HeroDetailGuard;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: router }],
    });
    guard = TestBed.inject(HeroDetailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
