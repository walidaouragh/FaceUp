import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  registerForm: FormGroup;
  @Output() cancelRegister = new EventEmitter();

  ngOnInit(): void {
    this.createRegisterForm();
  }

  register(): void {
    this.accountService.register(this.registerForm.value).subscribe(
      () => {
        this.toastr.success('Success!', 'You are in!');
        this.cancel();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  cancel(): void {
    this.cancelRegister.emit(false);
  }

  private createRegisterForm(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
}
