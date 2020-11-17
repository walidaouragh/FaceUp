import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMember } from '../_models/IMember';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  constructor(private http: HttpClient) {}

  baseUrl = environment.apiUrl;

  getMembers(): Observable<IMember[]> {
    return this.http.get<IMember[]>(this.baseUrl + 'users');
  }

  getMember(username: string): Observable<IMember> {
    return this.http.get<IMember>(this.baseUrl + `users/${username}`);
  }
}
