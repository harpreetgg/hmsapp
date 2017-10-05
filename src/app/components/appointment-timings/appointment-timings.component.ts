import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointment-timings',
  templateUrl: './appointment-timings.component.html',
  styleUrls: ['./appointment-timings.component.css']
})
export class AppointmentTimingsComponent implements OnInit {
  user;
  appointmentId;

  constructor(
    private route: ActivatedRoute,
    public _af: AngularFireAuth,
    public _ad: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => this.appointmentId = params.id);
    console.log(this.appointmentId);
  }

}
