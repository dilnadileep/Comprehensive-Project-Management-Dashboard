import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', 
})
export class AuthService {
  private loggedIn = false; 

  constructor() {}

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin123') {
      // Set the login state to true for successful credentials
      this.loggedIn = true;
      return true;
    }
    // Return false for invalid credentials
    return false;
  }

  // Logs the user out by resetting the login state to false.
  logout(): void {
    this.loggedIn = false;
  }

  
  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
