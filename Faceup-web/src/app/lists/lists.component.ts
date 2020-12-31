import { Component, OnInit } from '@angular/core';
import { IMember } from '../_models/IMember';
import { IPagination } from '../_models/IPagination';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  constructor(private memberService: MembersService) {}

  predicate = 'liked';
  members: Partial<IMember[]>;
  pageNumber = 1;
  pageSize = 5;
  pagination: IPagination;

  ngOnInit(): void {
    this.getLikes();
  }

  getLikes(): void {
    this.memberService
      .getLikes(this.predicate, this.pageNumber, this.pageSize)
      .subscribe((response) => {
        this.members = response.result;
        this.pagination = response.pagination;
      });
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.getLikes();
  }
}
