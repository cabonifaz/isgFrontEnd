import {Component, OnInit} from '@angular/core';
import {HeaderService} from "../../shared/components/layout/header/header.service";
import {PartialUserResponse} from "../../shared/models/user.interface";
import {UserService} from "../../services/user/user.service";
import {RoleResponse} from "../../shared/models/role.interface";
import {RoleService} from "../../services/role/role.service";

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css']
})
export class UsersDashboardComponent implements OnInit {
  users: PartialUserResponse[] = [];
  roles: RoleResponse[] = [];
  selectedRoleId: number = 0;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.headerService.setTitle('Usuarios');
    this.loadUsers();
    this.roleService.getRoles().subscribe(roles => this.roles = roles);
  }

  loadUsers() {
    this.userService.getUsers({usuario: '', idRol: this.selectedRoleId}).subscribe(res => {
      this.users = res.usuarios;
    });
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
