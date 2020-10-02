import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  users: any[];

  title = 'Faceup-web';
  ngOnInit(): void {
    this.getUsers();
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
