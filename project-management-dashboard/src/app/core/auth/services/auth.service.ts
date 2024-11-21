import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private validCredentials = { username: 'admin', password: 'admin123' };

  login(username: string, password: string): boolean {
    return (
      username === this.validCredentials.username &&
      password === this.validCredentials.password
    );
  }
}
