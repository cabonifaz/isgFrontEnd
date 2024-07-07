import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {HeaderService} from "../../shared/components/layout/header/header.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private headerService: HeaderService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    // Cargar título
    this.headerService.setTitle('Máquinas');
  }

  openModal() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Message Content'});
  }

  openModalEdit() {
    this.messageService.add({severity: 'info', summary: 'Info', detail: 'Message Content'});
  }

}
