import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IMember } from 'src/app/_models/IMember';
import { IUser } from 'src/app/_models/IUser';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
})
export class MemberCardComponent implements OnInit {
  constructor(
    private memberService: MembersService,
    private toaster: ToastrService
  ) {}

  @Input() member: IMember;
  liker: IUser;

  ngOnInit(): void {}

  onLike(member: IMember): void {
    this.memberService.addLike(member.userName).subscribe(() => {
      this.toaster.success('You have liked ' + member.knownAs);
    });
  }
}
