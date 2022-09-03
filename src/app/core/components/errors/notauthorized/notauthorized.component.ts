import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notauthorized',
  templateUrl: './notauthorized.component.html',
  styleUrls: ['./notauthorized.component.scss']
})
export class NotAuthorizedComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  constructor() { }

  ngOnInit(): void {
  }

}
