import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/shared/components/utils/Validations/CustomValidators';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginService } from '../../services/login.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('slideIn', [
      state('in', style({ transform: 'translateX(0%)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.7s')
      ]),
    ]),
    trigger('fadeInOut', [
      transition(':enter', [   // :enter es alias de 'void => *'
        style({ opacity: 0 }),
        animate('0.5s ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave es alias de '* => void'
        animate('0.5s ease-in', style({ opacity: 0 }))
      ])
    ])
  ],
  styles: [
    `
      :host ::ng-deep p-password input  {
          padding-top: 1rem;
          padding-bottom: 1rem;
      }
    `
  ],
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authenticationService: AuthenticationService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginFormBuild();
  }

  loginFormBuild() {
    this.loginForm = this.fb.group({
      username: ['', [CustomValidators.required]],
      password: ['', [CustomValidators.required, CustomValidators.minLength(1)]],
    });
  }

  // onButtonClick() {
  //   this.router.navigate(['/main']);
  // }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.loginService.login({ username, password }).subscribe(() => {
        this.router.navigate(['/main']);
      });
      // console.log('loginForm: ', this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
