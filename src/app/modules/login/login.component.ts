import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Token, UserLogin } from './../../model/user.interface';
import { SuccessComponent } from './../../shared/components/alerts/success/success.component';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private readonly route: Router,
    private readonly service: LoginService,
    private _snackBar: MatSnackBar
  ){}


  // atenção nesse ponto

  logar(){

    this.service.acessar(this.form.value as UserLogin)?.subscribe({
      next: (response: Token) => {
        console.log(response)
        if(response.token != '') {
          window.sessionStorage.setItem('user-report', response.token)
          this.route.navigate(['/']);
          this._snackBar.openFromComponent(SuccessComponent, {
            duration: 5 * 1000, horizontalPosition: 'end', verticalPosition: 'top'
          });
        } else {
          alert('senha incorreta')
        }
      }
    });
  }
}
