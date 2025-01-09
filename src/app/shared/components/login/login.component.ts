import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../core/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  template: `
    <div class="auth-container">
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <h2>Login</h2>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            formControlName="email"
            class="form-control">
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            formControlName="password"
            class="form-control">
        </div>

        <button type="submit" [disabled]="!loginForm.valid">
          Login
        </button>

        <p class="register-link">
          Don't have an account?
          <a routerLink="/auth/register">Register</a>
        </p>
      </form>
    </div>
  `,
  styles: [`
    .auth-container {
      max-width: 400px;
      margin: 40px auto;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .form-group {
      margin-bottom: 15px;
    }
    .form-control {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #ccc;
    }
    .register-link {
      text-align: center;
      margin-top: 15px;
    }
  `]
})

export class LoginComponent{
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.loginForm=this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8)]]
    });
  }
  async onSubmit(): Promise<void>{
    if (this.loginForm.valid){
      try{
        const {email, password} = this.loginForm.value;
        await this.authService.login(email,password);
        this.router.navigate(['/booking']);
      }catch (error){
        //firebase stuff
        console.error('Login failed: ', error)
      }
    }
  }
}
