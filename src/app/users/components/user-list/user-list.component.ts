import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';
import { faEye, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { Listable } from 'src/app/core/models/listable.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { tap } from 'rxjs';

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
  limit: number = 25;
  totalItems: number = 0;
  totalPages: number = 1;

  constructor(
    private usersService: UsersService,
    private titleService: Title,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('List of users');
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsersList(this.page, this.limit).subscribe((response: Listable<User[]>) => {
      this.users = response.data;
      this.limit = response.limit;
      this.page = response.page;
      this.totalItems = response.total;
      this.totalPages = Math.floor(this.totalItems / this.limit);
    });
  }

  searchOnEnter(event: any): void {
    let keyword = event.target.value;
    this.usersService.searchUser(keyword).subscribe((response:User[]) => {
      this.users = response;
    });
  }

  onResetSearch(event: any): void {
    if (event.target.value.length == 0) {
      this.getUsers();
    }
  }

  onPageChange(event: number): void {
    this.page = event;
    this.getUsers();
  }

  onDelete(canDelete: boolean, id: number): void {
    if (canDelete === true) {
      this.usersService.deleteUser(id).pipe(
        tap(() => {
          this.getUsers();
          this.notificationService.showSuccess(`User ${id} successfully deleted`, 'Delete');
        })
      ).subscribe();
    }
  }
}
