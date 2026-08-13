import { Injectable, signal } from '@angular/core';

export const MOCK_CREDENTIALS = {
  email: 'maikel@maikel.es',
  password: 'Mario',
} as const;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _isAuthenticated = signal(false);
  private readonly _user = signal<string | null>(null);
  private readonly _attempts = signal(0);

  readonly isAuthenticated = this._isAuthenticated.asReadonly();
  readonly user = this._user.asReadonly();
  readonly attempts = this._attempts.asReadonly();

  login(email: string, password: string): boolean {
    const success =
      email.trim().toLowerCase() === MOCK_CREDENTIALS.email &&
      password === MOCK_CREDENTIALS.password;

    this._attempts.update((n) => n + 1);

    if (success) {
      this._isAuthenticated.set(true);
      this._user.set(email.trim().toLowerCase());
    } else {
      this._isAuthenticated.set(false);
      this._user.set(null);
    }

    return success;
  }

  logout(): void {
    this._isAuthenticated.set(false);
    this._user.set(null);
  }
}
