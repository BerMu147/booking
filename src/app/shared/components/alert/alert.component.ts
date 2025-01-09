import { Component } from "@angular/core";
import { ErrorService } from "../../../core/services/error.service";

@Component({
  selector: 'app-alert',
  template:`
    <div *ngIf="error$ | async as error" class="alert" [ngClass]="error.type">
      {{ error.message }}
      <button class="close-btn" (click)="clearError()">×</button>
    </div>
  `,
  styles: [`
    .alert {
      padding: 15px;
      border-radius: 4px;
      margin: 10px;
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      min-width: 200px;
    }
    .error { background-color: #f8d7da; border: 1px solid #f5c6cb; }
    .warning { background-color: #fff3cd; border: 1px solid #ffeeba; }
    .info { background-color: #d1ecf1; border: 1px solid #bee5eb; }
    .close-btn {
      float: right;
      cursor: pointer;
      background: none;
      border: none;
    }
  `]
})

export class AlertComponent{
  private errorService: any;
  constructor(errorService: ErrorService){
    this.errorService = errorService;
  }
}
