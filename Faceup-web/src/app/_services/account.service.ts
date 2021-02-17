import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../_models/IUser';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private http: HttpClient,
    private presenceService: PresenceService
  ) {}

  baseUrl = environment.apiUrl;

  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  login(loginModel: IUser): any {
    return this.http.post(this.baseUrl + 'account/login', loginModel).pipe(
      map((user: IUser) => {
        if (user) {
          this.setCurrentUser(user);
          this.presenceService.createHubConnection(user);
        }
      })
    );
  }

  register(registerModel: IUser): any {
    return this.http
      .post(this.baseUrl + 'account/register', registerModel)
      .pipe(
        map((user: IUser) => {
          if (user) {
            this.setCurrentUser(user);
            this.presenceService.createHubConnection(user);
          }
        })
      );
  }

  setCurrentUser(user: IUser): void {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;

    Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.presenceService.stopHubConnection();
  }

  getDecodedToken(token: string): any {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
