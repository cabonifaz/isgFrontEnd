import {Component, OnInit} from '@angular/core';
import {Machine} from "../../shared/models/machine.interface";
import {ActivatedRoute} from "@angular/router";
import {MACHINES} from "../../mocks/mock-data";

@Component({
  selector: 'app-machine-events',
  templateUrl: './machine-events.component.html',
  styles: [
    `
      :host ::ng-deep .p-datatable .p-datatable-header {
        border-width: 1px 1px 0px 1px;
        background: #fff;
        border-top-left-radius: 0.75rem;
        border-top-right-radius: 0.75rem;
      }

      :host ::ng-deep .p-datatable .p-paginator-bottom {
        border-width: 0px 1px 1px 1px;
        border-bottom-left-radius: 0.75rem;
        border-bottom-right-radius: 0.75rem;
      }

      :host ::ng-deep .p-paginator .p-paginator-prev {
        display: none;
      }

      :host ::ng-deep .p-paginator .p-paginator-next {
        display: none;
      }
    `
  ],
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
