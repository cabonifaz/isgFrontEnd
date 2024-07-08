import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxSpinnerModule
  ],
  exports: [LoaderComponent],
  providers: [LoaderService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule { }
