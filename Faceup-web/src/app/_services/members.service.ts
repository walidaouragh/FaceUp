import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IMember } from '../_models/IMember';
import { IPaginationResult } from '../_models/IPagination';
import { IUser } from '../_models/IUser';
import { IUserParams } from '../_models/IUserParams';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user: IUser) => {
      this.user = user;
      this.userParams = new IUserParams(this.user);
    });
  }

  baseUrl = environment.apiUrl;
  members: IMember[] = [];
  memberCache = new Map();
  userParams: IUserParams;
  user: IUser;

  getUserParams(): IUserParams {
    return this.userParams;
  }

  setUserParams(params: IUserParams): void {
    this.userParams = params;
  }

  resetUserParams(): IUserParams {
    this.userParams = new IUserParams(this.user);
    return this.userParams;
  }

  getMembers(
    userParams: IUserParams
  ): Observable<IPaginationResult<IMember[]>> {
    var response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return getPaginatedResult<IMember[]>(
      this.baseUrl + 'users',
      params,
      this.http
    ).pipe(
      map((response) => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );
  }

  getMember(username: string, isUpdate?: boolean): Observable<IMember> {
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: IMember) => member.userName === username);

    if (member) {
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

  addLike(username: string): any {
    return this.http.post(this.baseUrl + `likes/${username}`, {});
  }

  getLikes(predicate: string, pageNumber: number, pageSize: number): any {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);

    return getPaginatedResult<Partial<IMember[]>>(
      this.baseUrl + 'likes',
      params,
      this.http
    );
  }
}
