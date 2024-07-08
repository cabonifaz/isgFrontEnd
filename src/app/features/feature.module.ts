import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MachineEventsComponent} from './machine-events/machine-events.component';
import {UserFormComponent} from './user-form/user-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsersDashboardComponent} from './users-dashboard/users-dashboard.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    DashboardComponent,
    MachineEventsComponent,
    UserFormComponent,
    UsersDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    DashboardComponent,
    MachineEventsComponent,
    UserFormComponent,
    UsersDashboardComponent
  ]
})
export class FeatureModule {
}
