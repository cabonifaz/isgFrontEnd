import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MachineEventsComponent} from './machine-events/machine-events.component';
import {UserFormComponent} from './user-form/user-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from '../shared/shared.module';
import {UsersDashboardComponent} from "./users-dashboard/users-dashboard.component";
import { SensorConfigurationComponent } from './sensor-configuration/sensor-configuration.component';
import {SliderModule} from "primeng/slider";
import {StyleClassModule} from "primeng/styleclass";
import {ColorPickerModule} from "primeng/colorpicker";


@NgModule({
  declarations: [
    DashboardComponent,
    MachineEventsComponent,
    UsersDashboardComponent,
    UserFormComponent,
    SensorConfigurationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SliderModule,
    StyleClassModule,
    ColorPickerModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class FeatureModule {
}
