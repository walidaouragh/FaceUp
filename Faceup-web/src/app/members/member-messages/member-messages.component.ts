import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { IMessage } from 'src/app/_models/IMessage';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss'],
})
export class MemberMessagesComponent implements OnInit {
  constructor(public messageService: MessageService) {}
  @ViewChild('messageForm') messageForm: NgForm;
  @Input() username: string;
  messageContent: string;

  ngOnInit(): void {}

  sendMessage(): void {
    this.messageService
      .sendMessage(this.username, this.messageContent)
      .then(() => {
        this.messageForm.reset();
      });
  }
}
