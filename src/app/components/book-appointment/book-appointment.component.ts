import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Appointment } from '../../interfaces/appointment';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {
  user;

  usrName;
  usrEmail;

  appointment: Appointment = {
    baName: '',
    baEmail: '',
    baPhone: '',
    baPatientType: '',
    baDepartment: '',
    baReason: ''
  };

  constructor(
    public _af: AngularFireAuth,
    public _ad: AngularFireDatabase
  ) {
    this._af.authState.subscribe(user => {
      if (user) {
        this.usrName = user.displayName;
        this.appointment.baName = user.displayName;
        this.usrEmail = user.email;
        this.appointment.baEmail = user.email;
      }
    })
  }


  ngOnInit() {
  }

}
