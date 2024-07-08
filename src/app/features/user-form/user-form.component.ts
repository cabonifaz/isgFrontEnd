import {Component, OnInit} from '@angular/core';
import {RoleResponse} from "../../shared/models/role.interface";
import {RoleService} from "../../services/role/role.service";
import {HeaderService} from "../../shared/components/layout/header/header.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  roles: RoleResponse[] = [];
  userFormGroup: FormGroup = new FormGroup({});

  constructor(
    private userService: UserService,
    private headerService: HeaderService,
    private roleService: RoleService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    // Cargar título
    this.headerService.setTitle('Usuarios');
    this.roleService.getRoles().subscribe(roles => this.roles = roles);
    this.initForm();
  }

  initForm() {
    this.userFormGroup = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      usuario: ['', Validators.required],
      clave: ['', Validators.required],
      usuarioCreador: [this.getUsuarioCreador()],
      idRol: ['', Validators.required]
    });
  }

  getUsuarioCreador(): string {
    let token: string = sessionStorage.getItem('token')!;
    let decodedPayload = JSON.parse(atob(token.split('.')[1]));
    return decodedPayload.sub;
  }

  saveUser() {
    let nuevoUsuario = this.userFormGroup.value;
    this.userService.addUser(nuevoUsuario).subscribe(
      response => alert(response.message),
    );
    this.userFormGroup.reset();
    /*.subscribe(user => {
      this.toastr.success('Usuario creado exitosamente');
      this.router.navigate(['/users']);
    });*/
    //console.log(nuevoUsuario);
  }

}
