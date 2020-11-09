import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss'],
})
export class ServerErrorComponent implements OnInit {
  constructor(private router: Router) {
    // navigationExtras are availabel only for constructors,will throw an error in ngOnInit
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation?.extras?.state?.error;
    console.log(this.error);
  }

  public error: any;

  ngOnInit(): void {}
}
