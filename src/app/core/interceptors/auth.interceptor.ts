import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { request } from "http";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor (private authService: AuthService){}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //firebase stuff
    return next.handle(request);
  }
}
