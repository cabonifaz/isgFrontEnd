import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private title = new BehaviorSubject<string>('Bienvenido');
  public title$ = this.title.asObservable();

  setTitle(title: string) {
    this.title.next(title);
  }

  getUserId(): number {
    let token: string = sessionStorage.getItem('token')!;
    let decodedPayload = JSON.parse(atob(token.split('.')[1]));
    return decodedPayload.id;
  }
}
