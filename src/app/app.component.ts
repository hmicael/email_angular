import { Component, OnInit } from '@angular/core';
import { environment } from './../environments/environment';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'email_angular';
  apiUrl = environment.apiURL;
  isLogged!: boolean;


  constructor(
    private authService: AuthService
    ) { }

    ngOnInit(): void {
      this.isLogged = this.authService.isLogged()
    }
}
