import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Appointment } from '../../interfaces/appointment';
import { Md2Toast } from 'md2/toast';

import * as firebase from 'firebase';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {
  public loading = false;
  user;

  pageSwitch;

  usrUid;
  usrName;
  usrEmail;

  baPatientId;

  imageReportSnapshot;

  departments: FirebaseListObservable<any>;

  appointment: Appointment = {
    baName: '',
    baAddress: '',
    baEmail: '',
    baPhone: '',
    baPatientType: '',
    baDepartment: '',
    baReason: ''
  };

  constructor(
    public _af: AngularFireAuth,
    public _ad: AngularFireDatabase,
    private _toast: Md2Toast
  ) {
    this._af.authState.subscribe(user => {
      if (user) {
        this.usrUid = user.uid;
        this.usrName = user.displayName;
        this.appointment.baName = user.displayName;
        this.usrEmail = user.email;
        this.appointment.baEmail = user.email;
        this.appointment.baPhone = user.phoneNumber;
      }
    });

    this.departments = _ad.list('/departments');

  }

  ngOnInit() {
    this.pageSwitch = 'new-form';
  }

  gotoSelectOptions() {
    this.pageSwitch = '';
  }

  gotoExistingForm() {
    this.pageSwitch = 'existing-form';
  }

  gotoNewPatientForm() {
    this.pageSwitch = 'new-form';
  }

  // Retrieve Data of a patient from database if patient is existing patient
  fetchPatientData() {
    console.log(this.baPatientId);
  }

  saveImageReport(event) {
    this.loading = true;
    event.preventDefault();
    var file = event.target.files[0];
    const filename = file.name;
    const pushKey = firebase.database().ref('/appointments').push().key;
    if (!file.type.match('image.*')) {
      this._toast.clearAllToasts();
      this._toast.show('You can only upload images at the moment.', 5000);
      this.loading = false;
    } else {
      const fileext = filename.match(/\w+$/g);
      const uploadRefUrl = this.usrUid + '/' + pushKey;
      var uploadTask = firebase.storage().ref(uploadRefUrl).put(file);
      uploadTask.on('state_changed', snapshot => {
        this.imageReportSnapshot = snapshot;
      });
      uploadTask.then(snapshot => {
        const fullPath = snapshot.metadata.fullPath;
        this._ad.database.ref('/appointments/' + pushKey).update({
          baReport: 'true',
          baPatientName: this.appointment.baName,
          baPatientAddress: this.appointment.baAddress,
          baPatientPhone: this.appointment.baPhone,
          baEmailAddress: this.appointment.baEmail,
          baDeptt: this.appointment.baDepartment,
          baReason: this.appointment.baReason,
          baReportUrl: snapshot.downloadURL,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(u => {
          this._toast.show('Report successfully uploaded.', 5000);
          this.loading = false;
        })
      }).catch(error => {
        this._toast.clearAllToasts();
        this._toast.show('Error: ' + error.message, 7000);
        this.loading = false;
      });
    }
  }

}
