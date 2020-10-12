import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../_models/IUser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) {}

  registerMode = false;
  users: IUser[];

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle(): void {
    this.registerMode = !this.registerMode;
  }

  cancelRegister(registerMode: boolean): void {
    this.registerMode = registerMode;
  }

  getUsers(): void {
    this.http.get('https://localhost:5001/api/users').subscribe(
      (users: any[]) => {
        this.users = users;
        console.log(this.users);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
