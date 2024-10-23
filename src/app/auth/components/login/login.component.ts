import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {CustomValidators} from 'src/app/shared/components/utils/Validations/CustomValidators';
import {LoginService} from '../../services/login.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ParameterService} from "../../../services/parameter/parameter.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('slideIn', [
      state('in', style({transform: 'translateX(0%)'})),
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('0.7s')
      ]),
    ]),
    trigger('fadeInOut', [
      transition(':enter', [   // :enter es alias de 'void => *'
        style({opacity: 0}),
        animate('0.5s ease-out', style({opacity: 1}))
      ]),
      transition(':leave', [   // :leave es alias de '* => void'
        animate('0.5s ease-in', style({opacity: 0}))
      ])
    ])
  ],
  styles: [
    `
      :host ::ng-deep p-password input {
        padding-top: 1rem;
        padding-bottom: 1rem;
      }
    `
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  urlDownloadApp: string = '#';
  urlDownloadGuideApp: string = '#';

  rememberLogin: boolean = false;
  xValue: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private parameterService: ParameterService
  ) {
    this.xValue = localStorage.getItem('x') || '';
    this.rememberLogin = (this.xValue != '');
  }

  ngOnInit(): void {
    this.loginFormBuild();
    this.loadLinks();
  }

  loginFormBuild() {
    this.loginForm = this.fb.group({
      username: ['', [CustomValidators.required]],
      password: ['', [CustomValidators.required, CustomValidators.minLength(1)]],
    });

    if (this.xValue != '') {
      const dataValue = JSON.parse(atob(this.xValue.substring(1, (this.xValue.length - 1))));
      this.loginForm.get('username')?.setValue(dataValue.username);
      this.loginForm.get('password')?.setValue(dataValue.password);
    }

  }

  // onButtonClick() {
  //   this.router.navigate(['/main']);
  // }

  onSubmit() {
    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;
      this.loginService.login({username, password}).subscribe((data) => {
        if (data && this.rememberLogin) {
          localStorage.setItem('x', 'a' + btoa(JSON.stringify({username, password})) + '0');
        } else {
          localStorage.removeItem('x');
        }
        this.router.navigate(['/main']);
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }


  loadLinks() {
    this.parameterService.getLinksDownload().subscribe({
      next: (resp) => {
        if (resp.baseResponse.idTipoMensaje == 2) {
          this.urlDownloadApp = resp.lstParams[0].str1;
          this.urlDownloadGuideApp = resp.lstParams[1].str1;
        } else if (resp.baseResponse.idTipoMensaje == 1) {
          console.error("Error", resp.baseResponse);
        }
      },
      error: (err) => {
        throw new Error(err);
      }
    })
  }

}
