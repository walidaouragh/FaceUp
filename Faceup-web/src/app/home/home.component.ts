import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  registerMode = false;

  ngOnInit(): void {}

  registerToggle(): void {
    this.registerMode = !this.registerMode;
  }

  cancelRegister(registerMode: boolean): void {
    this.registerMode = registerMode;
  }
}
