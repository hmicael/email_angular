import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-servererror',
  templateUrl: './servererror.component.html',
  styleUrls: ['./servererror.component.scss']
})
export class ServerErrorComponent implements OnInit {
  faArrowLeft = faArrowLeft;

  constructor() { }

  ngOnInit(): void {
  }

}
