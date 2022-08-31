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
  apiUrl = environment.apiURL;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(username: string, password: string): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}/login`, {username, password}).pipe(shareReplay());
  }

  isLogged(): boolean {
    if(this.jwtHelper.isTokenExpired(localStorage.getItem('acces_token') ?? undefined)) {
      return false;
    } else {
      return true;
    }
  }
}
