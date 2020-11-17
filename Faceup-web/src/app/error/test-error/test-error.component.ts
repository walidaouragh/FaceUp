import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html'
})
export class TestErrorComponent implements OnInit {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;
  validationErrors: string[] = [];

  ngOnInit(): void {
  }

  get404Error(): void {
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe(
        (response: HttpErrorResponse) => {
            console.log(response);
        },
        (error) => {
            console.log(error);
        }
    );
}

  get500Error(): void {
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe(
        (response: HttpErrorResponse) => {
            console.log(response);
        },
        (error) => {
            console.log(error);
        }
    );
  }

  get400Error(): void {
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe(
        (response: HttpErrorResponse) => {
            console.log(response);
        },
        (error) => {
            console.log(error);
        }
    );
  }

  get401Error(): void {
    this.http.get(this.baseUrl + 'buggy/auth').subscribe(
        (response: HttpErrorResponse) => {
            console.log(response);
        },
        (error) => {
            console.log(error);
        }
    );
  }

  get400ValidationError(): void {
    this.http.post(this.baseUrl + 'account/register', {}).subscribe(
        (response: HttpErrorResponse) => {
            console.log(response);
        },
        (error) => {
            console.log(error);
            this.validationErrors = error;
        }
    );
  }
}
