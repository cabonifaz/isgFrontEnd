import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {CheckboxModule} from "primeng/checkbox";



@NgModule({
  declarations: [
    LoginComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        CheckboxModule
    ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
