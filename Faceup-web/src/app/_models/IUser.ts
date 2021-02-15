export interface IUser {
  id: number;
  userName: string;
  password: string;
  token: string;
  photoUrl: string;
  knownAs: string;
  gender: string;
  roles: string[];
}
