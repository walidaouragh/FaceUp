import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../_models/IUser';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  loginForm: FormGroup;
  currentUser$: Observable<IUser>;
  userName: any;

  ngOnInit(): void {
    this.createLoginForm();
    this.currentUser$ = this.accountService.currentUser$;
  }

  login(): void {
    this.accountService.login(this.loginForm.value).subscribe(
      (response: any) => {
        this.router.navigate(['/members']);
        this.toastr.success('You have successfully logged in!');
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.toastr.error(error.error);
      }
    );
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigate(['/']);
    this.toastr.success('You have successfully logged out!');
  }

  private createLoginForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
}
