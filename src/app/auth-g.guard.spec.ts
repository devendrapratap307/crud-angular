import { TestBed } from '@angular/core/testing';

import { AuthGGuard } from './auth-g.guard';

describe('AuthGGuard', () => {
  let guard: AuthGGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
