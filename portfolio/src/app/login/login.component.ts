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

  homePage(): void {
    //   if credentials match up --> go to landing page i.e. portfolio
    this.router.navigate(['home']);
  }

}
