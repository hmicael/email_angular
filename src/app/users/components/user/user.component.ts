import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faEdit, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user$!: Observable<User>;
  faEdit = faEdit;
  faArrowLeft = faArrowLeft;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const userId = +this.route.snapshot.params['id'];
    this.user$ = this.userService.getUserById(userId);
  }

}
