import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError!: string;
  isLoginFailed!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private titleService: Title
    ) { }

  ngOnInit(): void {
    if(this.authService.isLogged()) {
      this.router.navigateByUrl('');
    }
    this.titleService.setTitle("Login");

    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  get email(): any {
    return this.loginForm.get('email');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  onLogin(): void {
    const val = this.loginForm.value;
    this.authService.login(val.email, val.password)
    .pipe(
      tap(() => this.router.navigateByUrl('/users')),
      catchError((error) => {
        this.isLoginFailed = true;
        return throwError(() => new Error('Login failed'));
      })
    )
    .subscribe({
      next(value) { localStorage.setItem('access_token', value.token) },
      error(err) { console.log('Login failed') },
      complete() { console.log('Login sequence finished'); }
    });
  }
}
