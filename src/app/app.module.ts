import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { Md2Module } from 'md2';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import * as firebase from 'firebase';

import { MainAppService } from './services/main-app.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TeamComponent } from './components/team/team.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignupComponent } from './components/signup/signup.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';

export const firebaseConfig = {
  apiKey: "AIzaSyDJKziYmWhtnfEMczNPhLuAfgO2D-_fcXo",
  authDomain: "hmisbfgi.firebaseapp.com",
  databaseURL: "https://hmisbfgi.firebaseio.com",
  projectId: "hmisbfgi",
  storageBucket: "hmisbfgi.appspot.com",
  messagingSenderId: "985462858967"
};

firebase.initializeApp(firebaseConfig);

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'book-appointment', component: BookAppointmentComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    HomeComponent,
    LoginComponent,
    TeamComponent,
    AboutComponent,
    ContactComponent,
    ForgotPasswordComponent,
    SignupComponent,
    BookAppointmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(routes),
    Md2Module,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [
    MainAppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
