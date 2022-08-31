import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/services/auth.service';
import { CustomValidators } from 'src/app/core/tools/custom.validator';
import { tap } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  passwordForm!: FormGroup;
  faArrowLeft = faArrowLeft;
  faEye= faEye;
  faEyeSlash = faEyeSlash;
  showPassword!: boolean;
  passwordType!: 'password' | 'text';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Reset password");

    let passwordRegex = /^((?=.+[a-zA-Z])(?=.+[0-9])|(?=.+[,<>\\\+\?\)\(\-\/;\.!@#\$%\^&\*]))(?=.{8,})/;
    this.passwordForm = this.formBuilder.group({
      password: [null, [Validators.required, Validators.pattern(passwordRegex)]],
      confirm_password: [null]
    }, {
      validators: [CustomValidators.MatchValidator('password', 'confirm_password')]
    });
  }

  get passwordMatchError(): any {
    return (
      this.passwordForm.getError('mismatch') &&
      this.passwordForm.get('confirm_password')?.touched
    );
  }

  toggleShow(): void {
    this.showPassword = !this.showPassword;
    this.passwordType = this.showPassword ? 'text' : 'password';
  }

  get f(): any {
    return this.passwordForm.controls;
  }

  onSubmit(): any {
    const token = this.route.snapshot.params['token'];
    delete this.passwordForm.value.confirm_password;
    this.authService.resetPassword(this.passwordForm.value, token).pipe(
      tap(() => console.log("Password reseted")),
    ).subscribe();
  }

}
