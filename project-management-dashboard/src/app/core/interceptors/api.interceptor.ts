import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private readonly baseUrl = 'http://localhost:3000'; // Base URL for the JSON server

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to modify its URL
    const apiReq = req.clone({
      url: `${this.baseUrl}${req.url}`, // Prepend the base URL
    });

    // Handle the modified request and add global error handling
    return next.handle(apiReq).pipe(
      catchError((error) => {
        console.error('API Error:', error);
        throw error; // Re-throw the error for further handling
      })
    );
  }
}
