import { Component, OnInit } from '@angular/core';
import { IMember } from 'src/app/_models/IMember';
import { IPagination, IPaginationResult } from 'src/app/_models/IPagination';
import { IUser } from 'src/app/_models/IUser';
import { IUserParams } from 'src/app/_models/IUserParams';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  constructor(private membersService: MembersService) {}

  members: IMember[];
  pagination: IPagination;
  userParams: IUserParams;
  user: IUser;
  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
  ];

  ngOnInit(): void {
    this.userParams = this.membersService.getUserParams();
    this.getMembers();
  }

  getMembers(): void {
    this.membersService.setUserParams(this.userParams);
    this.membersService
      .getMembers(this.userParams)
      .subscribe((response: IPaginationResult<IMember[]>) => {
        this.members = response.result;
        this.pagination = response.pagination;
      });
  }

  pageChanged(event: any): void {
    this.userParams.pageNumber = event.page;
    this.membersService.setUserParams(this.userParams);
    this.getMembers();
  }

  resetFilters(): void {
    this.userParams = this.membersService.resetUserParams();
    this.getMembers();
  }
}
