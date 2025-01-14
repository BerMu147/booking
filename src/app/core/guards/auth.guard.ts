import { Injectable } from "@angular/core";
import { Observable, map, take } from "rxjs";
import { AuthService } from "../services/auth.service";
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot, GuardResult, MaybeAsync } from "@angular/router";

@Injectable({providedIn:'root'})

export class AuthGuard implements CanActivate, CanActivateChild{
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
        const requredRole = route.data['role'];

        if(!user){
          this.router.navigate(['auth/login'], {
            queryParams: {returnUrl: state.url}
          });
          return false;
        }
        if (requredRole && user.role !== requredRole){
          this.router.navigate(['/booking']);
          return false;
        }
        return true;
      })
    );
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):Observable<boolean>{
    return this.canActivate(route, state);
  }
}
