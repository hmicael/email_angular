import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';
import { faEye, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users$!: Observable<User[]>;
  faEye = faEye;
  faArrowLeft = faArrowLeft;

  constructor(
    private usersService: UsersService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('List of users');
    this.users$ = this.usersService.getUsersList();
  }

  searchOnEnter(event: any): void {
    let keyword = event.target.value;
    this.users$ = this.usersService.searchUser(keyword);
  }

  onResetSearch(event: any) {
    if (event.target.value.length == 0) {
      this.users$ = this.usersService.getUsersList();
    }
  }
}
