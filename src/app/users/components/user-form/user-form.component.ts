import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { tap } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UsersService } from 'src/app/core/services/users.service';
import { CustomValidators } from 'src/app/core/tools/custom.validator';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  formLegend!: string;
  passwordType!: 'password' | 'text';
  showPassword!: boolean;
  isAddUserMode!: boolean;
  faEye= faEye;
  faEyeSlash = faEyeSlash;
  faArrowLeft = faArrowLeft;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private titleService: Title,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.isAddUserMode = !this.router.url.match(/^\/users\/[1-9]+\/edit$/g);
    this.passwordType = 'password';
    this.formLegend = 'Create User';
    this.titleService.setTitle(this.formLegend);
    let passwordRegex = /^((?=.+[a-zA-Z])(?=.+[0-9])|(?=.+[,<>\\\+\?\)\(\-\/;\.!@#\$%\^&\*]))(?=.{8,})/;
    this.userForm = this.formBuilder.group({
      id: [0],
      name: [null, [Validators.required]],
      firstname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null, [
          this.isAddUserMode ? Validators.required : Validators.nullValidator,
          Validators.pattern(passwordRegex)
        ]
      ],
      confirm_password: [null],
      roles: ['ROLE_USER', Validators.required]
    }, {
      validators: [CustomValidators.MatchValidator('password', 'confirm_password')]
    });

    if(!this.isAddUserMode) {
      const userId = +this.route.snapshot.params['id'];
      this.formLegend = `Edit User-${userId}`;
      this.titleService.setTitle(this.formLegend);
      // on edit, password is not yet required so the regex is changed
      passwordRegex = /^((?=.+[a-zA-Z])(?=.+[0-9])|(?=.+[,<>\\\+\?\)\(\-\/;\.!@#\$%\^&\*]))(?=.{0,})/;
      this.userService.getUserById(userId).pipe(
        tap((value) => {
          this.userForm.patchValue(value);
        })
      ).subscribe();
    }
  }

  get f(): any {
    return this.userForm.controls;
  }

  changeRoles(e: any): void {
    this.userForm.get('roles')?.setValue(e.target.value);
  }

  get passwordMatchError(): any {
    return (
      this.userForm.getError('mismatch') &&
      this.userForm.get('confirm_password')?.touched
    );
  }

  toggleShow(): void {
    this.showPassword = !this.showPassword;
    this.passwordType = this.showPassword ? 'text' : 'password';
  }

  onSubmit(): void {
    delete this.userForm.value.confirm_password;
    this.userForm.value.roles = Array.isArray(this.userForm.value.roles) ?
      this.userForm.value.roles : [this.userForm.value.roles];
    if(this.isAddUserMode) {
      delete this.userForm.value.id;
      this.userService.addUser(this.userForm.value).pipe(
        tap((createdUser) => this.router.navigate(['users', createdUser.id]).then(
          () => this.notificationService.showSuccess(
            `${createdUser.firstname} ${createdUser.name} successfully created !`,
            'Created'
          )
        ))
      ).subscribe();
    } else {
      // If password is null, it will be removed from Json request
      if (!this.userForm.value.password) {
        delete this.userForm.value.password;
      }
      this.userService.updateUser(this.userForm.value).pipe(
        tap(() => this.router.navigate(['users', this.userForm.value.id]).then(
          () => this.notificationService.showSuccess(
            `${this.userForm.value.firstname} ${this.userForm.value.name} successfully edited !`,
            'Edited'
          )
        ))
      ).subscribe();
    }
  }
}
