import { Component, OnInit } from '@angular/core';
import { HeaderService } from "../../shared/components/layout/header/header.service";
import { PartialUserResponse } from "../../shared/models/user.interface";
import { UserService } from "../../services/user/user.service";
import { RoleResponse } from "../../shared/models/role.interface";
import { RoleService } from "../../services/role/role.service";
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
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

      :host ::ng-deep .p-button-primary {
        background-color: #ff7600;
        border-color: #ff7600;
      }

      :host ::ng-deep .p-button-primary:hover {
        background-color: #ff5500;
        border-color: #ff5500;
      }

      :host ::ng-deep .p-button-primary:focus {
        background-color: #ff5500;
        border-color: #ff5500;
        box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #ff9b33, 0 1px 2px 0 black;
      }

      :host ::ng-deep .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
        border-radius: 0.75rem;
        background: #ffe5ca;
        color: #d8601d;
        border-color: #ff9b33;
      }

      :host ::ng-deep .p-paginator:hover .p-paginator-pages:hover .p-paginator-page:hover {
        border-radius: 0.75rem;
        background: #FFE5CA;
        color: #D8601D;
        border-color: #FF9B33;
      }
    `
  ],
  styleUrls: ['./users-dashboard.component.css']
})
export class UsersDashboardComponent implements OnInit {
  users: PartialUserResponse[] = [];
  roles: RoleResponse[] = [];
  selectedRoleId: number = 0;
  username: string = '';

  first: number = 0;
  rows: number = 0;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private headerService: HeaderService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.headerService.setTitle('Usuarios');
    this.headerService.setBackTo('/main');
    this.handleRequest()
  }

  handleRequest() {
    forkJoin({
      roles: this.roleService.getRoles(),
      users: this.userService.getUsers({
        usuario: this.username,
        idRol: this.selectedRoleId
      })
    }).subscribe(
      ({ roles, users }) => {
        this.roles = roles;
        this.users = users.usuarios;
        this.rows = 5;
      },
      error => {
        console.error('Error al cargar los datos: ', error);
        if (error.status === 500) {
          this.router.navigate(['/main']);
        }
      }
    );
  }

  loadUsers() {
    this.userService.getUsers({
      usuario: this.username,
      idRol: this.selectedRoleId
    }).subscribe(
      res => {
        this.users = res.usuarios;
        this.rows = 5;
      },
      error => {
        console.error('Error al cargar los usuarios: ', error);
        if (error.status === 500) {
          this.router.navigate(['/main']);
        }
      }
    );
  }

  setFilter(username: string): void {
    this.username = username;
    this.selectedRoleId = 0;
  }

  setUserId(id: number): void {
    this.userService.setUserId(id);
  }

  clearUserId(): void {
    this.userService.setUserId(0);
  }

  onChange(event: any) {
    this.selectedRoleId = event.value;
  }

  next(): void {
    if (!this.isLastPage()) {
      this.first = this.first + this.rows;
    }
  }

  prev(): void {
    if (!this.isFirstPage()) {
      this.first = this.first - this.rows;
    }
  }

  isLastPage(): boolean {
    return this.users ? this.first + this.rows >= this.users.length : true;
  }

  isFirstPage(): boolean {
    return this.users ? this.first === 0 : true;
  }

}
