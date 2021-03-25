import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var M: any; /* Materialize tabs */

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(router: Router) { }

  ngOnInit(): void { /* Materialize tabs */
    const elem = document.querySelector('.tabs');
    const options = {};
    M.Tabs.init(elem, options);
  }

}
