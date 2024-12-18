import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './auth/components/login/login.component';
import {MainComponent} from './shared/components/layout/main/main.component';
import {DashboardComponent} from './features/dashboard/dashboard.component';
import {MachineEventsComponent} from './features/machine-events/machine-events.component';
import {UserFormComponent} from './features/user-form/user-form.component';
import {AuthGuard} from './core/guards/auth-guard.guard';
import {UsersDashboardComponent} from "./features/users-dashboard/users-dashboard.component";
import {SensorConfigurationComponent} from "./features/sensor-configuration/sensor-configuration.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'sensor-configuration', component: SensorConfigurationComponent},
  // // { path: 'register', component: SingUpComponent },
  {
    path: 'main', component: MainComponent, canActivate: [AuthGuard], children: [
      {path: '', pathMatch: 'full', component: DashboardComponent},
      {path: 'machine-events', component: MachineEventsComponent},
      {path: 'user-form', component: UserFormComponent},
      {path: 'users-dashboard', component: UsersDashboardComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
