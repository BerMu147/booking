import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user.interface";

@Injectable({
  providedIn: 'root'
})

export class AuthService{
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) { }

  private checkAuthState(): void{
    //firebase stuff
  }

  getCurrentUser(): Observable<User | null>{
    return this.currentUser$
  }

  async login(email: string, password:string): Promise<void>{
    //firebase stuff
    this.currentUserSubject.next({
      uid: '1',
      email,
      role: 'customer',
      createdAt: new Date()
    });
  }

  async logout(): Promise<void>{
    //firebase stuff
    this.currentUserSubject.next(null);
    await this.router.navigate(['/auth/login'])
  }

  async register(email: string, password: string, role: User['role']): Promise <void>{
    //firebase stuff
  }
}
