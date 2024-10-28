import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MachineEventsComponent} from './machine-events/machine-events.component';
import {UserFormComponent} from './user-form/user-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from '../shared/shared.module';
import {UsersDashboardComponent} from "./users-dashboard/users-dashboard.component";
import { NotificationListComponent } from './notifications/notification-list/notification-list.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MachineEventsComponent,
    UsersDashboardComponent,
    UserFormComponent,
    NotificationListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class FeatureModule {
}
