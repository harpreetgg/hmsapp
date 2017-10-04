import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Md2Toast } from 'md2/toast';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  usrEmail;

  constructor(
    public _af: AngularFireAuth,
    public _toast: Md2Toast
  ) { }

  ngOnInit() {
  }

  validateEmail(usremail) {
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(usremail);
    if (re) { return true; } else { return false; }
  }

  forgotEmail() {
    if (this.validateEmail(this.usrEmail)) {
      this._af.auth.sendPasswordResetEmail(this.usrEmail).then(u => {
        this._toast.clearAllToasts();
        this._toast.show('An email with verification link has been sent to your registered Email Address', 7000);
      }).catch(err => {
        this._toast.clearAllToasts();
        this._toast.show('Error: ' + err.message, 7000);
      });
    } else {
      this._toast.clearAllToasts();
      this._toast.show('Please enter a valid Email Address', 5000);
    }
  }

}
