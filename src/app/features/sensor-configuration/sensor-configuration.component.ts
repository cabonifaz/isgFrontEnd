import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sensor-configuration',
  templateUrl: './sensor-configuration.component.html',
  styleUrls: ['./sensor-configuration.component.css']
})
export class SensorConfigurationComponent implements OnInit {
  sliderRange: number[] = [50];

  color: string = "#0011ff";

  constructor() {
    this.sliderRange = [50];
  }

  ngOnInit(): void {
  }

}
