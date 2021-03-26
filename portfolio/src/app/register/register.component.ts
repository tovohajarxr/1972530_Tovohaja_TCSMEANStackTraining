import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void { }

  register(): void {
    if (sessionStorage.getItem('credentials') == null || sessionStorage.getItem('credentials') === undefined) {
      const user = (document.getElementById('username') as HTMLInputElement).value;
      const pwd = (document.getElementById('password') as HTMLInputElement).value;
      const credentials = { username: user, password: pwd };

      sessionStorage.setItem('credentials', JSON.stringify(credentials));
      console.log(`successfully registered. Welcome ${user}!`);
      this.router.navigate(['login']);
    } else {
      alert('Already registered!');
    }
  }

}
