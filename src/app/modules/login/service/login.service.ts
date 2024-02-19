import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Token, UserLogin } from './../../../model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  private usermock = new Subject<Token>()

  acessar(userLogin: UserLogin): Observable<Token> {
    
    if(userLogin.username === 'jonathan.souza@gmail.com' && userLogin.password === '@Jl123') {
      this.usermock.next({token: 'abc123'});
    } else {
      const tk: Token = {
        token: ''
      }
      this.usermock.next(tk)
    
    }
    return this.usermock;
  }
}
