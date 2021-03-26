import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void { }

  login(): void {
    console.log('==> homePage() ~ login ts');
    //   if credentials match up --> go to landing page i.e. portfolio
    const user = (document.getElementById('username') as HTMLInputElement).value;
    const pwd = (document.getElementById('password') as HTMLInputElement).value;
    const login = {username: user, password: pwd};
    sessionStorage.setItem('login', JSON.stringify(login));

    this.router.navigate(['landing']);
  }

  register(): void {
    this.router.navigate(['register']);
  }

}
