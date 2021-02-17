import { Component, OnInit } from '@angular/core';
import { IUser } from './_models/IUser';
import { AccountService } from './_services/account.service';
import { PresenceService } from './_services/presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private presenceService: PresenceService
  ) {}

  title = 'Faceup-web';
  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(): void {
    const user: IUser = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.accountService.setCurrentUser(user);
      this.presenceService.createHubConnection(user);
    }
  }
}
