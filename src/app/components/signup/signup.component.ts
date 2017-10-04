import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  usrName;
  usrEmail;
  usrPassword;

  constructor(
    private _router: Router,
    public _af: AngularFireAuth
  ) { }

  ngOnInit() {
  }

}
