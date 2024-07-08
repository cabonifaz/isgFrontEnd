import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LoaderService } from './core/loader/loader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private primengConfig: PrimeNGConfig, public loader: LoaderService) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
