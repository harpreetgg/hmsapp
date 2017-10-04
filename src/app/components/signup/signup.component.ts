import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Md2Toast } from 'md2/toast';
import * as firebase from 'firebase';

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
    public _af: AngularFireAuth,
    public _ad: AngularFireDatabase,
    private _toast: Md2Toast
  ) {
  }

  ngOnInit() {
  }

  validateName(usrname) {
    const re = /^([a-zA-Z .]+)$/.test(usrname);
    if (re) { return true; } else { return false; }
  }

  validateEmail(usremail) {
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(usremail);
    if (re) { return true; } else { return false; }
  }

  onSignUp() {
    if (!this.validateName(this.usrName)) {
      this._toast.show("Your name must consist only of alphabets.", 5000);
      return;
    } else if (!this.validateEmail(this.usrEmail)) {
      this._toast.show('Please enter a valid Email Address.', 5000);
    } else if (this.validateName(this.usrName) && this.validateEmail(this.usrEmail)) {
      this._af.auth.createUserWithEmailAndPassword(this.usrEmail, this.usrPassword).then(u => {
        this._af.authState.subscribe(user => {
          user.updateProfile({
            displayName: this.usrName,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/hmisbfgi.appspot.com/o/img_avatar3.png?alt=media&token=63a2160f-6624-445c-b6cb-77e1f5b19f67'
          }).then(snapshot => {
            console.log('Profile updated!');
            this._ad.database.ref('/users/' + user.uid).set({
              usrName: this.usrName,
              usrEmail: this.usrEmail,
              usrPhoto: 'https://firebasestorage.googleapis.com/v0/b/hmisbfgi.appspot.com/o/img_avatar3.png?alt=media&token=63a2160f-6624-445c-b6cb-77e1f5b19f67',
              usrCreatedAt: firebase.database.ServerValue.TIMESTAMP
            });
            user.sendEmailVerification().then(snap => {
              this._toast.show('Please verify your Email Address.', 5000);
            }).catch(err => {
              console.log("Error: " + err.message);
            })
          }).catch(err => {
            console.log('Error: ' + err.message);
          });
        });
      }).catch(err => {
        this._toast.show('Error: ' + err.message, 7000);
      });
    }
  }

}
