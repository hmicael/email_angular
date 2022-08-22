import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { tap, Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';
import { CustomValidators } from 'src/app/core/tools/custom.validator';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  action!: string;
  userForm!: FormGroup;
  formLegend!: string;
  passwordType!: 'password' | 'text';
  showPassword!: boolean;
  faEye= faEye;
  faEyeSlash = faEyeSlash;
  user!: Observable<User>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.passwordType = 'password';
    const passwordRegex = /^((?=.+[a-zA-Z])(?=.+[0-9])|(?=.+[,<>\\\+\?\)\(\-\/;\.!@#\$%\^&\*]))(?=.{8,})/;
    if(this.router.url == '/users/create') {
      this.action = 'create';
      this.formLegend = 'Create User';
      this.titleService.setTitle(this.formLegend);
      this.userForm = this.formBuilder.group({
        name: [null, [Validators.required]],
        firstname: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.pattern(passwordRegex)]],
        confirm_password: [null, Validators.required],
        roles: [['ROLE_USER'], Validators.required]
      }, {
        validators: [CustomValidators.MatchValidator('password', 'confirm_password')]
      }
      );
    } else if (this.router.url.match(/^\/users\/[1-9]+\/edit$/g)) {
      this.action = 'edit';
      const userId = +this.route.snapshot.params['id'];
      this.formLegend = `Edit User-${userId}`;
      this.titleService.setTitle(this.formLegend);
    }
  }

  get f(): any {
    return this.userForm.controls;
  }

  changeRoles(e: any) {
    this.roles?.setValue([e.target.value]);
  }

  get roles(): any {
    return this.userForm.get('roles')
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
    this.userService.addUser(this.userForm.value).subscribe(

    );
  }
}
