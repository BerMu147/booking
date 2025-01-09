import { Component } from "@angular/core";
import { LoadingService } from "../../../core/services/loading.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-loading-spinner',
  template: `
  <div *ngIf="loading$ | async" class="spinner-overlay">
    <div class="spinner"></div>
  </div>
  `,
  styles:[`
    .spinner-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .spinner {
      width: 50px;
      height: 50px;
      border: 5px solid #f3f3f3;
      border-top: 5px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class LoadingSpinnerComponent {
  loading$: Observable<boolean>;
  constructor(private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$;
  }
}
