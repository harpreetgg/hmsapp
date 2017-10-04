import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { MainAppService } from '../../services/main-app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user;
  appName;

  usrEmail;
  usrPassword;

  constructor(
    public _af: AngularFireAuth,
    public _ma: MainAppService
  ) {
    this.user = this._af.authState;
    this.appName = this._ma.getAppName();
  }

  ngOnInit() {
  }

}
