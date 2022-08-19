import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token!: string;
  apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    // this is just the HTTP call,
    // we still need to handle the reception of the token
    return this.http.post<User>(`${this.apiUrl}/login`, {email, password}); //.shareReplay();
  }

  getToken(): string {
    return this.token;
  }
}
