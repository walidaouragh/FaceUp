import { Component, OnInit } from '@angular/core';
import { IMessage } from '../_models/IMessage';
import { IPagination } from '../_models/IPagination';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  constructor(private messageService: MessageService) {}

  messages: IMessage[] = [];
  pagination: IPagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(): void {
    this.loading = true;
    this.messageService
      .getMessages(this.pageNumber, this.pageSize, this.container)
      .subscribe((response) => {
        this.messages = response.result;
        this.pagination = response.pagination;
        this.loading = false;
      });
  }

  deleteMessage(messageId: number) {
    this.messageService.deleteMessage(messageId).subscribe(() => {
      this.messages.splice(
        this.messages.findIndex((m) => m.messageId === messageId),
        1
      );
    });
  }

  pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.getMessages();
    this.loading = false;
  }
}
