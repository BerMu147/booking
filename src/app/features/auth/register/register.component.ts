import { Component } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { AuthService } from "../../../core/services/auth.service"
import { UserRole } from "../../../core/models/user.interface"


@Component({
  selector: 'app-register',
  template:`
    <div class="auth-containter">
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <h2>Create Account</h2>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            formControlName="email"
            class="form-control">
          <div *ngIf="registerForm.get('email')?.touched && registerForm.get('email')?.invalid" class="error-message">
            <span *ngIf="registerForm.get('email')?.errors?.['required']">Email is required</span>
            <span *ngIf="registerForm.get('email')?.errors?.['email']">Please enter a valid email</span>
          </div>
        </div>

        <div class="form-group">
          <label for="displayName">Full Name</label>
          <input
            id="displayName"
            type="text"
            formControlName="displayName"
            class="form-control">
          <div *ngIf="registerForm.get('displayName')?.touched && registerForm.get('displayName')?.invalid" class="error-message">
            <span *ngIf="registerForm.get('displayName')?.errors?.['required']">Full name is required</span>
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            formControlName="password"
            class="form-control">
          <div *ngIf="registerForm.get('password')?.touched && registerForm.get('password')?.invalid" class="error-message">
            <span *ngIf="registerForm.get('password')?.errors?.['required']">Password is required</span>
            <span *ngIf="registerForm.get('password')?.errors?.['minlength']">Password must be at least 6 characters</span>
          </div>
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            formControlName="confirmPassword"
            class="form-control">
          <div *ngIf="registerForm.get('confirmPassword')?.touched && registerForm.errors?.['passwordMismatch']"
               class="error-message">
            Passwords do not match
          </div>
        </div>

        <div class="form-group">
          <label for="role">Account Type</label>
          <select id="role" formControlName="role" class="form-control">
            <option value="customer">Customer</option>
            <option value="provider">Service Provider</option>
          </select>
        </div>

        <button type="submit" [disabled]="registerForm.invalid">
          Register
        </button>

        <p class="login-link">
          Already have an account?
          <a routerLink="/auth/login">Login</a>
        </p>
      </form>
    </div>
  `,
  styles:[`
      .auth-container{
        max-width: 400px;
        margin: 20px auto;
        padding: 20px;
        border-radius: 10px;
      }
            .form-group {
      margin-bottom: 15px;
    }
    .form-control {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-top: 4px;
    }
    .error-message {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 4px;
    }
    button {
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
    }
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    .login-link {
      text-align: center;
      margin-top: 15px;
    }
    select {
      height: 35px;
    }
    `]
})

export class RegisterComponent{
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.registerForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      displayName: ['',[Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      role: ['customer', Validators.required]
    }, {validators: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup){
    return g.get('password')?.value === g.get('confirmPassword')?.value ? null : {passwordMismatch: true};
  }

  async onSubmit(): Promise<void>{
    if (this.registerForm.valid){
      try{
        const {email, password, role, displayName } = this.registerForm.value;
        await this.authService.register(email, password, role as UserRole);
        this.router.navigate(['auth/login']);
      }catch (error){
        //firebase stuff
        console.error('Registration failed: ', error)
      }
    }
  }
}
