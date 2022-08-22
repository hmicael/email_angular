import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';
import { faTrash, faEye, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users$!: Observable<User[]>;
  faEye = faEye;
  faTrash = faTrash;
  faArrowLeft = faArrowLeft;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.users$ = this.usersService.getUsersList();
  }
}
