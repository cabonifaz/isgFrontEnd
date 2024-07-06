import {Component, OnInit} from '@angular/core';
import {Machine} from "../../shared/models/machine.interface";
import {ActivatedRoute} from "@angular/router";
import {MACHINES} from "../../mocks/mock-data";

@Component({
  selector: 'app-machine-events',
  templateUrl: './machine-events.component.html',
  styleUrls: ['./machine-events.component.css']
})
export class MachineEventsComponent implements OnInit {

  machineId!: number;
  machine: Machine = MACHINES.filter(machine => machine.id === 1)[0];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.machineId = +params.get('machine-id')!;
    });
  }

}
