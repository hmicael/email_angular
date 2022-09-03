import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Listable } from '../models/listable.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  getUsersList(page: number = 1, limit: number = 25): Observable<Listable<User[]>> {
    return this.http.get<Listable<User[]>>(`${this.apiUrl}/users?page=${page}&limit=${limit}`);
  }

  searchUser(keyword: string): Observable<User[]> {
    return this.http.post<any>(`${this.apiUrl}/users/search`, {keyword});
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  addUser(formValue: {name: string, firstname: string, email: string, password: string, roles: []}): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, formValue);
  }

  updateUser(formValue: {id: number, name: string, firstname: string, email: string, password?: string, roles: []}): any {
    return this.http.put<User>(`${this.apiUrl}/users/${formValue.id}`, formValue);
  }

  deleteUser(id: number): any{
    return this.http.delete<User>(`${this.apiUrl}/users/${id}`);
  }
}
