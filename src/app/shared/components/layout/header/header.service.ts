import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UserResponse} from 'src/app/shared/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private title = new BehaviorSubject<string>('Bienvenido');
  public title$ = this.title.asObservable();
  // Nuevo BehaviorSubject para el usuario
  private currentUser = new BehaviorSubject<UserResponse | null>(null);
  public currentUser$ = this.currentUser.asObservable();
  private backTo = new BehaviorSubject<string>('');
  public backTo$ = this.backTo.asObservable();

  setTitle(title: string) {
    this.title.next(title);
  }

  setBackTo(backTo: string) {
    this.backTo.next(backTo);
  }

  getUserId(): number {
    let token: string = sessionStorage.getItem('token')!;
    let decodedPayload = JSON.parse(atob(token.split('.')[1]));
    return decodedPayload.id;
  }

  getRolId(): number {
    let token: string = sessionStorage.getItem('token')!;
    let decodedPayload = JSON.parse(atob(token.split('.')[1]));
    return decodedPayload.id;
  }

  sharedUser(user: UserResponse) {
    this.currentUser.next(user);
  }
}
