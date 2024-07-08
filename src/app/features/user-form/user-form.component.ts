import {Component, OnInit} from '@angular/core';
import {RoleResponse} from "../../shared/models/role.interface";
import {RoleService} from "../../services/role/role.service";
import {HeaderService} from "../../shared/components/layout/header/header.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  roles: RoleResponse[] = [];
  userId: number = 0;
  userFormGroup: FormGroup = new FormGroup({});

  constructor(
    private userService: UserService, private headerService: HeaderService,
    private roleService: RoleService, private formBuilder: FormBuilder, private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userId = this.userService.userId;
    this.headerService.setTitle(this.userId == 0 ? 'Registro de usuario' : 'Actualización de usuario');
    this.roleService.getRoles().subscribe(roles => this.roles = roles);
    this.loadUpdateUserRequest();
    this.initForm();
    console.log(this.userId);
  }

  initForm() {
    this.userFormGroup = this.formBuilder.group({
      idUsuario: [''],
      idEstado: [''],

      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      usuario: ['', Validators.required],
      clave: ['', Validators.required],
      usuarioCreador: [this.getUsuarioCreador()],
      idRol: ['', Validators.required]
    });

  }

  saveUser(): void {
    let user = this.userFormGroup.value;
    if (this.userId == 0) {
      this.userService.addUser(user).subscribe(
        response => {
          alert(response.message);
          this.userFormGroup.reset();
          this.router.navigate(['/main/users-dashboard']);
        },
      );
    } else {
      this.userService.updateUser(user).subscribe(
        response => alert(response.message),
      );
    }
  }

  updatePassword(): void {
    this.userService.updatePassword(
      {idUsuario: this.userId, clave: this.userFormGroup.get('clave')!.value}
    ).subscribe(
      response => alert(response.message),
    );
    this.userFormGroup.get('clave')?.setValue('');
  }

  getUsuarioCreador(): string {
    let token: string = sessionStorage.getItem('token')!;
    let decodedPayload = JSON.parse(atob(token.split('.')[1]));
    return decodedPayload.sub;
  }


  loadUpdateUserRequest(): void {
    if (this.userId != 0) {
      this.userService.getUserById(this.userId).subscribe(user => {
        this.userFormGroup.patchValue(user);
        this.userFormGroup.get('idUsuario')!.setValue(this.userId);
      });
    }
  }

}
