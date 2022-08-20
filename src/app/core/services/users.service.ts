import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private token!: string;
  apiUrl = environment.apiURL;
  users = [
    {
      id: 1,
      email: "email-1@example.com",
      name: "name-1",
      firstname: "firstname-1",
      roles: [
        "ROLE_ADMIN"
      ]
    },
    {
      id: 2,
      email: "email-2@example.com",
      name: "name-2",
      firstname: "firstname-2",
      roles: [
        "ROLE_USER"
      ]
    },
    {
      id: 3,
      email: "email-3@example.com",
      name: "name-3",
      firstname: "firstname-3",
      roles: [
        "ROLE_USER"
      ]
    },
    {
      id: 4,
      email: "email-4@example.com",
      name: "name-4",
      firstname: "firstname-4",
      roles: [
        "ROLE_ADMIN"
      ]
    }
  ];

  constructor(private http: HttpClient) {}

  getUsersList(): User[] {
    return this.users;
  }

}
