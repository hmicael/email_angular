import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';
import { faEye, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { Listable } from 'src/app/core/models/listable.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users!: User[];
  faEye = faEye;
  faArrowLeft = faArrowLeft;
  page: number = 1;
  limit: number = 50;
  total: number = 0;

  constructor(
    private usersService: UsersService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('List of users');
    this.usersService.getUsersList().subscribe((response: Listable<User[]>) => {
      this.users = response.data;
    });
  }

  searchOnEnter(event: any): void {
    let keyword = event.target.value;
    this.usersService.searchUser(keyword).subscribe((response:User[]) => {
      this.users = response;
    });
  }

  onResetSearch(event: any) {
    if (event.target.value.length == 0) {
      this.usersService.getUsersList().subscribe((response: Listable<User[]>) => {
        this.users = response.data;
      });
    }
  }
}
