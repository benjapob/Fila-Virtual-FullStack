import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { environment } from 'client/environments/environment.development';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AddAppointmentModalComponent } from './appointments/components/add-appointment-modal/add-appointment-modal.component';
import { AppointmentsLiveComponent } from './appointments-live/appointments-live.component';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentsComponent,
    AddAppointmentModalComponent,
    AppointmentsLiveComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
