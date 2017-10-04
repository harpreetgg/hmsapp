import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user;

  pageSwitch;

  constructor(
    public _af: AngularFireAuth
  ) {
    this.user = this._af.authState;
  }

  ngOnInit() {
    this.pageSwitch = 'login';
  }

  gotoLoginPage() {
    this.pageSwitch = 'login';
  }

  gotoTeamPage() {
    this.pageSwitch = 'teampage';
  }

  gotoAboutPage() {
    this.pageSwitch = 'aboutpage';
  }

  gotoContactPage() {
    this.pageSwitch = 'contactpage';
  }

  gotoForgotPassword() {
    this.pageSwitch = 'forgotpass';
  }

  gotoSignup() {
    this.pageSwitch = 'signuppage'
  }

}
