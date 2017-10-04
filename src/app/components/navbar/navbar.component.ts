import { Component, OnInit } from '@angular/core';
import { MainAppService } from '../../services/main-app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appName;

  constructor(
    public _ma: MainAppService
  ) {
    this.appName = this._ma.getAppName();
  }

  ngOnInit() {
  }

}
