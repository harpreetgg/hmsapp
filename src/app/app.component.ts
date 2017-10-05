import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {MainAppService} from './services/main-app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user;
  appName;

  pageSwitch;

  constructor(
    public _af: AngularFireAuth,
    public _ma: MainAppService
  ) {
    this.user = this._af.authState;
    this.appName = this._ma.getAppName();
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
