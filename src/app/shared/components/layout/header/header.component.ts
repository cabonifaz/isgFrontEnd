import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from "./header.service";
import { MenuItem } from "primeng/api";
import { UserService } from "../../../../services/user/user.service";
import { UserResponse } from "../../../models/user.interface";
import { LoginService } from 'src/app/auth/services/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = '';
  items: MenuItem[] = [];
  user!: UserResponse;

  constructor(
    private route: Router,
    private headerService: HeaderService,
    private userService: UserService,
    private loginService: LoginService
  ) {
  }

  ngOnInit(): void {
    // Cargar el título
    this.headerService.title$.subscribe(title => this.title = title);
    this.items = [
      {
        label: 'Opciones',
        items: [{
          label: 'Ver usuarios',
          icon: 'pi pi-users',
          routerLink: '/main/users-dashboard'
        }]
      }
    ];
    this.loadUserData();
  }

  backToLogin() {
    this.loginService.logout();
  }

  loadUserData(): void {
    this.userService.getUserById(1).subscribe(
      response => this.user = response
    );
  }
}
