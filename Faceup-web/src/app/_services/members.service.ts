import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IMember } from '../_models/IMember';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  constructor(private http: HttpClient) {}

  baseUrl = environment.apiUrl;
  members: IMember[] = [];

  getMembers(): Observable<IMember[]> {
    /*  if (this.members.length > 0) {
      return of(this.members);
    } */
    return this.http.get<IMember[]>(this.baseUrl + 'users').pipe(
      map((members: IMember[]) => {
        this.members = members;
        return members;
      })
    );
  }

  getMember(username: string, isUpdate?: boolean): Observable<IMember> {
    const member = this.members.find((x) => x.userName === username);

    if (member !== undefined && !isUpdate) {
      return of(member);
    }
    return this.http.get<IMember>(this.baseUrl + `users/${username}`);
  }

  updateMember(member: IMember): Observable<void> {
    return this.http.put<void>(this.baseUrl + 'users', member);
  }

  deletePhoto(photoId: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `users/photo/${photoId}`);
  }

  setMainPhoto(photoId: number): Observable<any> {
    return this.http.put<any>(
      this.baseUrl + `users/set-main-photo/${photoId}`,
      {}
    );
  }
}
