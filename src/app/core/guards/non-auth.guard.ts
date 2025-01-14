import { Injectable } from "@angular/core";
import { Observable, map, take } from "rxjs";
import { AuthService } from "../services/auth.service";
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot, GuardResult, MaybeAsync } from "@angular/router";

@Injectable({providedIn:'root'})

export class NonAuthGuard implements CanActivate{
  constructor(
    private authservice: AuthService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>{
    return this.authservice.getCurrentUser().pipe(
      take(1),
      map(user => {
        if (user){
          this.router.navigate(['/bookint']);
          return false;
        }
        return true;
      })
    )
  }
}
