import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sensor-configuration',
  templateUrl: './sensor-configuration.component.html',
  styleUrls: ['./sensor-configuration.component.css']
})
export class SensorConfigurationComponent implements OnInit, AfterViewInit {
  sliderRange: number[] = [50];
  sliderTamanio: number[] = [100, 100]

  color: string = "#0011ff";
  numRebotes: number = 20;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const sliderHandle = document.querySelector('.box-slider-2 .p-slider.p-slider-vertical .p-slider-handle');
    if (sliderHandle) {
      sliderHandle.setAttribute('style', `animation: sube-baja-esfera ${60 / this.numRebotes}s infinite`);
    }
  }

  actualizarAnimacion() {
    const sliderHandle = document.querySelector('.box-slider-2 .p-slider.p-slider-vertical .p-slider-handle');
    if (sliderHandle) {
      sliderHandle.setAttribute('style', `animation: sube-baja-esfera ${60 / this.numRebotes}s infinite`);
    }
  }

}
