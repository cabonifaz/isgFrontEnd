import { Component } from '@angular/core';
import { LoaderService } from './loader.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  constructor(public loader: LoaderService, private spinner: NgxSpinnerService) { }
  ngOnInit() {
    /** spinner starts on init */
    if (this.loader.isLoading$) {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
  }
}
