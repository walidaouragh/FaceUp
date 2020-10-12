import { Component, OnInit } from '@angular/core';
import { IUser } from './_models/IUser';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private accountService: AccountService) {}

  title = 'Faceup-web';
  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(): void {
    const user: IUser = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }
}
