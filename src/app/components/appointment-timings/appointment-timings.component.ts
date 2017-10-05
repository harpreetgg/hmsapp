import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { Md2Toast } from 'md2/toast';

@Component({
  selector: 'app-appointment-timings',
  templateUrl: './appointment-timings.component.html',
  styleUrls: ['./appointment-timings.component.css']
})
export class AppointmentTimingsComponent implements OnInit {
  user;
  appointmentId;

  atDate;
  drName;
  drStartTime;
  drSittingTime;

  public loading = false;

  constructor(
    private route: ActivatedRoute,
    private _toast: Md2Toast,
    public _af: AngularFireAuth,
    public _ad: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => this.appointmentId = params.id);
    this._ad.database.ref('/appointments/' + this.appointmentId).once('value', u => {
      this._ad.list('/doctors', {
        query: {
          orderByChild: 'drUid',
          equalTo: u.val().baDoctor
        }
      }).subscribe(uu => {
        this.drName = uu[0].drName;
        this.drStartTime = uu[0].drSittingTime;
        this.drSittingTime = uu[0].drTotalTime;
      });
    });
  }

  inputDate() {
    // Split time Dr. sits
    var str = this.drStartTime;
    var res = str.split(":");
    var res0 = res[0] * 1;
    res0 += this.drSittingTime * 1;

    // Split time input by user
    const inputDate = new Date(this.atDate);
    const getDate = inputDate.getDate(); // get date
    const getMonth = inputDate.getMonth(); // get month
    const getYears = inputDate.getFullYear(); // get year
    const getHours = inputDate.getHours(); // get hour
    const getMinutes = inputDate.getMinutes(); // get minute
    const getDay = inputDate.getDay(); // get day

    // Split time at present
    const presentDate = new Date();
    const pgetDate = presentDate.getDate(); // get date
    const pgetMonth = presentDate.getMonth(); // get month
    const pgetYears = presentDate.getFullYear(); // get year
    const pgetHours = presentDate.getHours(); // get hour
    const pgetMinutes = presentDate.getMinutes(); // get minute
    const pgetDay = presentDate.getDay(); // get day

    if ((getMonth == pgetMonth && getYears == pgetYears) || (getMonth * 1 === (pgetMonth * 1 + 1) && getYears == pgetYears)) {
      if (getDate <= pgetDate && getMonth == pgetMonth && getYears == pgetYears && (getHours < pgetHours || (getHours == pgetHours && getMinutes < pgetMinutes))) {
        return this._toast.show('You are trying to peep to past. Sorry!', 7000);
      } else if (getHours < res[0] || getHours > res0) {
        return this._toast.show('Sorry! ' + this.drName + ' remains available only from ' + res[0] + ':' + res[1] + ' for ' + this.drSittingTime + ' hours only.', 7000);
      } else if (getHours == res[0]) {
        if (getMinutes < res[1]) {
          return this._toast.show('Sorry! ' + this.drName + ' remains available only from ' + res[0] + ':' + res[1] + ' for ' + this.drSittingTime + ' hours only.', 7000);
        }
      } else if (getHours == res0) {
        if (getMinutes > res[1]) {
          return this._toast.show('Sorry! ' + this.drName + ' remains available only from ' + res[0] + ':' + res[1] + ' for ' + this.drSittingTime + ' hours only.', 7000);
        }
      }
    } else if (!(getMonth == pgetMonth && getYears == pgetYears) || (getMonth * 1 === (pgetMonth * 1 + 1) && getYears == pgetYears)) {
      return this._toast.show('You can book an appointment for this month or next month only.', 7000);
    }

    switch (getDay) {
      case 0:
        return this._toast.show('Sorry! No appointment for sunday.', 5000);
    }


    this._ad.database.ref('/appointments/' + this.appointmentId).update({
      baTimeByUser: this.atDate
    })

  }

}
