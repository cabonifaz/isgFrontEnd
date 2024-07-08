import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HeaderService } from "../../shared/components/layout/header/header.service";
import { Equipo, MachineResponse } from 'src/app/shared/models/machine.interface';
import { MachineService } from 'src/app/services/machine/machine.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  equipment!: MachineResponse
  equipos!: Equipo[];
  selectedProducts!: Equipo[];
  constructor(
    private headerService: HeaderService,
    private messageService: MessageService,
    private machineService: MachineService) {
  }

  ngOnInit(): void {
    // Cargar título
    this.headerService.setTitle('Máquinas');
    this.machineService.getMachines(1, '').subscribe(machines => {
      // console.log('machines: ', machines);
      this.equipos = machines.equipos;
    })
  }

  openModal() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }

  openModalEdit() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  getSeverity(status: number) {
    switch (status) {
      case 1:
        return 'success';
      case 0:
        return 'danger';
      default:
        return 'info';
    }
  }
}
