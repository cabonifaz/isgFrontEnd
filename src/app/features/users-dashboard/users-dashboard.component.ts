import {Component, OnInit} from '@angular/core';
import {HeaderService} from "../../shared/components/layout/header/header.service";
import {PartialUserResponse} from "../../shared/models/user.interface";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css']
})
export class UsersDashboardComponent implements OnInit {
  users: PartialUserResponse[] = [];

  constructor(
    private userService: UserService,
    private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.headerService.setTitle('Usuarios');
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers({usuario: '', idRol: 0}).subscribe(res => {
      this.users = res.usuarios;
    });
  }

}
