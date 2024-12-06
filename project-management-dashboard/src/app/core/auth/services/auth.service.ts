import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', 
})


export class AuthService {
  constructor() {}

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin123') {
      // Persist login state in localStorage
      localStorage.setItem('loggedIn', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    // Clear login state from localStorage
    localStorage.removeItem('loggedIn');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }
}

