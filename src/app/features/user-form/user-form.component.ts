import { Component, OnInit } from '@angular/core';
import { RoleResponse } from "../../shared/models/role.interface";
import { RoleService } from "../../services/role/role.service";
import { HeaderService } from "../../shared/components/layout/header/header.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user/user.service";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  //Si el userId es diferente de cero, es porque se está actualizando un usuario
  //Si el userId es igual a cero, es porque se está registrando un nuevo usuario
  userId: number = 0;
  roles: RoleResponse[] = [];
  userFormGroup: FormGroup = new FormGroup({});
  passwordFormGroup: FormGroup = new FormGroup({});

  constructor(
    private userService: UserService,
    private headerService: HeaderService,
    private messageService: MessageService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userId = this.userService.userId;
    this.headerService.setBackTo('/main/users-dashboard');
    this.headerService.setTitle(this.userId == 0 ? 'Registro de usuario' : 'Actualización de usuario');
    this.roleService.getRoles().subscribe(roles => this.roles = roles);
    this.loadUpdateUserRequest();
    this.initForms();
  }

  initForms(): void {
    if (this.userId == 0) {
      //FormGroup para registrar usuario
      this.userFormGroup = this.formBuilder.group({
        nombres: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.pattern('^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\ ]+$')]],
        apellidos: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.pattern('^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\ ]+$')]],
        usuario: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z1234567890áéíóúüñÁÉÍÓÚÜÑ\\-_.]+$')]],
        clave: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(200)]],
        usuarioCreador: [this.getUsuarioCreador()],
        idRol: ['', [Validators.required]]
      });
    } else {
      //FormGroup para actualizar usuario
      this.userFormGroup = this.formBuilder.group({
        idUsuario: [''],
        idEstado: [''],
        nombres: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.pattern('^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\ ]+$')]],
        apellidos: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.pattern('^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\ ]+$')]],
        usuario: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z1234567890áéíóúüñÁÉÍÓÚÜÑ\\-_.]+$')]],
        usuarioCreador: [this.getUsuarioCreador()],
        idRol: ['', Validators.required]
      });
    }
    //FormGroup para actualizar contraseña
    this.passwordFormGroup = this.formBuilder.group({
      idUsuario: [this.userId],
      clave: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(200)]],
    });
  }

  saveUser(): void {
    let user = this.userFormGroup.value;
    if (this.userId == 0) {
      this.userService.addUser(user).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message });
          this.userFormGroup.reset();
          this.router.navigate(['/main/users-dashboard']);
        },
      );
    } else {
      this.userService.updateUser(user).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message });
          this.userFormGroup.reset();
          this.router.navigate(['/main/users-dashboard']);
        },
      );
    }
  }

  updatePassword(): void {
    let updatePasswordRequest = this.passwordFormGroup.value;
    this.userService.updatePassword(
      //{idUsuario: this.userId, clave: this.userFormGroup.get('clave')!.value}
      updatePasswordRequest
    ).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Contraseña actualizada', detail: response.message });
      },
    );
    this.passwordFormGroup.reset();
    this.router.navigate(['/main/users-dashboard']);
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
