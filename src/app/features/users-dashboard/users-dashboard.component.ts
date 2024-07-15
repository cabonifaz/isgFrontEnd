import {Component, OnInit} from '@angular/core';
import {HeaderService} from "../../shared/components/layout/header/header.service";
import {PartialUserResponse} from "../../shared/models/user.interface";
import {UserService} from "../../services/user/user.service";
import {RoleResponse} from "../../shared/models/role.interface";
import {RoleService} from "../../services/role/role.service";

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

      :host ::ng-deep .p-paginator .p-paginator-pages .p-paginator-page {
        border-radius: 0.75rem;
        background: #FFE5CA;
        color: #D8601D;
        border-color: #FF9B33;
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

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.headerService.setTitle('Usuarios');
    this.headerService.setBackTo('/main');
    this.loadUsers();
    this.roleService.getRoles().subscribe(roles => this.roles = roles);
  }

  loadUsers() {
    this.userService.getUsers(
      {
        usuario: this.username,
        idRol: this.selectedRoleId
      }
    ).subscribe(res => {
      this.users = res.usuarios;
    });
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

}
