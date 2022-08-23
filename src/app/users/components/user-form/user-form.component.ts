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
  userForm!: FormGroup;
  formLegend!: string;
  passwordType!: 'password' | 'text';
  showPassword!: boolean;
  addMode!: boolean;
  faEye= faEye;
  faEyeSlash = faEyeSlash;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.addMode = !this.router.url.match(/^\/users\/[1-9]+\/edit$/g);
    this.passwordType = 'password';
    this.formLegend = 'Create User';
    this.titleService.setTitle(this.formLegend);
    let passwordRegex = /^((?=.+[a-zA-Z])(?=.+[0-9])|(?=.+[,<>\\\+\?\)\(\-\/;\.!@#\$%\^&\*]))(?=.{8,})/;
    this.userForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      firstname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(passwordRegex)]],
      confirm_password: [null, Validators.required],
      roles: [['ROLE_USER'], Validators.required]
    }, {
      validators: [CustomValidators.MatchValidator('password', 'confirm_password')]
    });

    if(!this.addMode) {
      const userId = +this.route.snapshot.params['id'];
      this.formLegend = `Edit User-${userId}`;
      this.titleService.setTitle(this.formLegend);
      // on edit, password is not yet required so the regex is changed
      passwordRegex = /^((?=.+[a-zA-Z])(?=.+[0-9])|(?=.+[,<>\\\+\?\)\(\-\/;\.!@#\$%\^&\*]))(?=.{0,})/;
      this.userService.getUserById(userId).pipe(
        tap((value) => {
          this.userForm.get('password')?.clearValidators();
          this.userForm.get('confirm_password')?.clearValidators();
          this.userForm.get('password')?.addValidators(Validators.pattern(passwordRegex));
          this.userForm.patchValue(value);
        })
      ).subscribe();
    }
  }

  get f(): any {
    return this.userForm.controls;
  }

  changeRoles(e: any): void {
    this.userForm.get('roles')?.setValue([e.target.value]);
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
    if(this.addMode) {
      this.userService.addUser(this.userForm.value).pipe(
        tap((value) => this.router.navigateByUrl(`users/+${value.id}`))
      ).subscribe();
    } else {
      // If the length of password is 0, it means that the password isn't updated
      // so it will be removed from Json request
      if (this.userForm.value.password.length === 0) {
        delete this.userForm.value.password;
      }

      this.userService.updateUser(this.userForm.value).pipe(
        tap(() => this.router.navigateByUrl(`users/${this.userForm.value.id}`))
      ).subscribe();
    }
  }
}
