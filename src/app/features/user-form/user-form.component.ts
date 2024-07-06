import {Component, OnInit} from '@angular/core';
import {RoleResponse} from "../../shared/models/role.interface";
import {RoleService} from "../../services/role/role.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  roles: RoleResponse[] = [];

  constructor(private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.roleService.getRoles().subscribe(roles => this.roles = roles);
    console.log('roles: ', this.roles);
  }

}
