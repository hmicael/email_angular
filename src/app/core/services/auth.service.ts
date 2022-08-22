import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from '../models/token.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token!: Token;
  apiUrl = environment.apiURL;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(username: string, password: string): boolean {
    // this is just the HTTP call,
    // we still need to handle the reception of the token
    try {
      const httpResponse = this.http.post<Token>(`${this.apiUrl}/login`, {username, password}).pipe(shareReplay());
      httpResponse.subscribe({
        next(value) { localStorage.setItem('access_token', value.token) },
        error(err) { console.error('Error') },
        complete() { console.log('Finished sequence'); }
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  isLogged(): boolean {
    if(this.jwtHelper.isTokenExpired(localStorage.getItem('acces_token') ?? undefined)) {
      return false;
    } else {
      return true;
    }
  }

  getToken(): Token {
    return this.token;
  }
}
