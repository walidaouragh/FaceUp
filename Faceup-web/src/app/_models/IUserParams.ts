import { IUser } from './IUser';

export class IUserParams {
  gender: string;
  minAge = 18;
  maxAge = 99;
  pageNumber = 1;
  pageSize = 5;
  orderBy = 'lastActive';

  constructor(user: IUser) {
    this.gender = user.gender === 'female' ? 'male' : 'female';
  }
}
