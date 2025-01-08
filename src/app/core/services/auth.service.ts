import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export interface User{
  uid: string,
  email: string,
  role: 'customer' | 'admin' | 'provider';
}

@Injectable({
  providedIn: 'root'
})

export class AuthService{
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() { }

  getCurrentUser(): Observable<User | null>{
    return this.currentUser$
  }

  async login(email: string, password:string): Promise<void>{
    //firebase stuff
  }

  async logout(): Promise<void>{
    //firebase stuff
  }

  async register(email: string, password: string, role: User['role']): Promise <void>{
    //firebase stuff
  }
}
