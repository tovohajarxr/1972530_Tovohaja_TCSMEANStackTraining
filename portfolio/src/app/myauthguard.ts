import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class MyAuthGuard implements CanActivate {
  constructor(public router: Router) {}

  canActivate(): boolean {
    console.log('==> canActivate() ~ myauthguard.ts');
    let credentials: any = sessionStorage.getItem('credentials');
    let login: any = sessionStorage.getItem('login');

    if ( credentials !== null || login !== null) {
      credentials = JSON.parse(credentials || '{}');
      login = JSON.parse(login || '{}');
      if (  credentials.username === login.username
        &&  credentials.password === login.password  ) {
        console.log(credentials);
        console.log(login);
        console.log('Successful login');
        return true;
      } else {
        console.log('Failed login');
        return false;
      }
    }
    else {
      this.router.navigate(['login']);
      return false;
    }
  }
}

