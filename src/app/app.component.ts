import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'email_angular';
  apiUrl = environment.apiURL;


  constructor(
    public router: Router
    ) { }

    ngOnInit(): void {
    }
}
