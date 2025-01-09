import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ErrorService } from "../services/error.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

  constructor(private errorService: ErrorService){}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) =>{
        let errorMessage = 'Unknown Error occurred';

        if (error.error instanceof ErrorEvent)
          errorMessage = error.error.message;
        else{
          switch (error.status){
            case 401:
              errorMessage = 'Unauthorized access';
              break;
            case 403:
              errorMessage = 'Access forbidden';
              break;
            case 404:
              errorMessage = 'Resource not found';
              break;
            case 500:
              errorMessage = 'Internal server error';
              break;
            default:
              errorMessage = `Error: ${error.message}`;
          }
        }
        this.errorService.showError(errorMessage);
        return throwError(() => error);
      })
    );
  }
}
