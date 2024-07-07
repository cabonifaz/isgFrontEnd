import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { MainComponent } from './shared/components/layout/main/main.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MachineEventsComponent } from './features/machine-events/machine-events.component';
import { UserFormComponent } from './features/user-form/user-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // // { path: 'register', component: SingUpComponent },
  {
    path: 'main', component: MainComponent, children: [
      { path: '', pathMatch: 'full', component: DashboardComponent },
      { path: 'machine-events', component: MachineEventsComponent },
      { path: 'user-form', component: UserFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
