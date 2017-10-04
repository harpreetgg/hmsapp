import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Md2Toast } from 'md2/toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageSwitch;

  usrEmail;
  usrPassword;

  constructor(
    public _af: AngularFireAuth,
    private _toast: Md2Toast
  ) { }

  ngOnInit() {
  }

  validateEmail(usremail) {
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(usremail);
    if (re) { return true; } else { return false; }
  }

  onSignIn() {
    if (this.validateEmail(this.usrEmail)) {
      this._af.auth.signInWithEmailAndPassword(this.usrEmail, this.usrPassword).then(snapshot => {
        return;
      }).catch(error => {
        this._toast.clearAllToasts();
        this._toast.show('Error: ' + error.message, 5000);
      });
    } else {
      this._toast.clearAllToasts();
      this._toast.show('Please enter a valid Email Address.', 5000);
    }
  }


  gotoForgotPassword() {
    this.pageSwitch = 'forgotpass';
  }

}
