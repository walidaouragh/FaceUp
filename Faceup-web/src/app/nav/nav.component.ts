import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IUser } from '../_models/IUser';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(private accountService: AccountService) {}

  loginForm: FormGroup;
  currentUser$: Observable<IUser>;
  errorMessage: string;

  ngOnInit(): void {
    this.createLoginForm();
    this.currentUser$ = this.accountService.currentUser$;
  }

  login(): void {
    console.log(this.loginForm.value);
    this.accountService.login(this.loginForm.value).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  logout(): void {
    this.accountService.logout();
  }

  private createLoginForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
}
