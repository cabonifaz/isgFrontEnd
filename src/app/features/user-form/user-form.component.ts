import {Component, OnInit} from '@angular/core';
import {RoleResponse} from "../../shared/models/role.interface";
import {RoleService} from "../../services/role/role.service";
import {HeaderService} from "../../shared/components/layout/header/header.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  roles: RoleResponse[] = [];

  constructor(
    private headerService: HeaderService,
    private roleService: RoleService) {
  }

  ngOnInit(): void {
    // Cargar título
    this.headerService.setTitle('Usuarios');
    this.roleService.getRoles().subscribe(roles => this.roles = roles);
  }

}
