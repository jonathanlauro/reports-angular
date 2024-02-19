import { inject, NgModule } from '@angular/core';
import { CanActivateFn, RouterModule, Routes } from '@angular/router';
import { TokenService } from './shared/security/token.service';

const tokenGuard: CanActivateFn = () => {
  const guardService = inject(TokenService);
  return guardService.isLogin()
}

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)},
   { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), canActivate:[tokenGuard] }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
