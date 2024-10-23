import {Component, OnInit} from '@angular/core';
import {HeaderService} from "../../../shared/components/layout/header/header.service";
import {Router} from "@angular/router";
import {NotificationList} from "../../../shared/models/notification.interface";
import {NotificationsService} from "../../../services/notifications/notifications.service";
import {throwError} from "rxjs";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  idEquipo: number = 0;
  nombreEquipo: string = '';

  notifications: NotificationList[] = [];

  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;

  constructor(
    private headerService: HeaderService,
    private messageService: MessageService,
    private router: Router,
    private notificationService: NotificationsService
  ) {
    this.headerService.setTitle('Notificaciones');
    this.headerService.setBackTo('/main');


  }

  ngOnInit(): void {
    this.idEquipo = this.notificationService.idEquipo;
    this.nombreEquipo = this.notificationService?.nombreEquipo || '';
    this.idEquipo != 0 ? this.listNotifications() : this.router.navigate(['/main']);
  }

  next() {
    if (!this.isLastPage()) {
      this.first = this.first + this.rows;
    }
  }

  prev() {
    if (!this.isFirstPage()) {
      this.first = this.first - this.rows;
    }
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.notifications ? this.first + this.rows >= this.notifications.length : true;
  }

  isFirstPage(): boolean {
    return this.notifications ? this.first === 0 : true;
  }

  listNotifications() {
    this.notificationService.getListNotifications(this.idEquipo).subscribe({
      next: (response) => {
        if (response.idTipoMensaje == 2) {
          this.notifications = response.notificaciones;
          this.totalRecords = response?.notificaciones?.length || 0;
        } else if (response.idTipoMensaje == 1) {
          this.messageService.add(
            {
              severity: response.idTipoMensaje == 2 ? 'success' : 'error',
              summary: response.idTipoMensaje == 2 ? 'Exito' : 'Error',
              detail: response.mensaje
            });
        }
      },
      error: (err) => {
        console.log(err);
        return throwError(() => err);
      }
    })
  }

}
