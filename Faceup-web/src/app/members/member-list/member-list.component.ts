import { Component, OnInit } from '@angular/core';
import { IMember } from 'src/app/_models/IMember';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  constructor(private membersService: MembersService) {}

  members: IMember[];

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers(): void {
    this.membersService.getMembers().subscribe((members: IMember[]) => {
      this.members = members;
    });
  }
}
