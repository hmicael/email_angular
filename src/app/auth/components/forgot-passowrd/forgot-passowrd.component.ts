import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/services/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-forgot-passowrd',
  templateUrl: './forgot-passowrd.component.html',
  styleUrls: ['./forgot-passowrd.component.scss']
})
export class ForgotPassowrdComponent implements OnInit {
  emailForm!: FormGroup;
  faArrowLeft = faArrowLeft;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Forgot password");

    this.emailForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    });

  }

  get email(): any {
    return this.emailForm.get('email');
  }

  onSubmit(): void {
    this.authService.forgotPassword(this.emailForm.value.email).pipe(
      tap(() => console.log("Email send to " + this.emailForm.value)),
    ).subscribe();
  }

}
