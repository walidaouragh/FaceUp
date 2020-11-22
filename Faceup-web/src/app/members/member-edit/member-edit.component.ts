import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { IMember } from 'src/app/_models/IMember';
import { IUser } from 'src/app/_models/IUser';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss'],
})
export class MemberEditComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  user: IUser;
  member: IMember;
  editForm: FormGroup;
  isFormValueChanged: boolean;

  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ): any {
    if (this.isFormValueChanged) {
      $event.returnValue = true;
    }
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getCurrentMember();
  }

  getCurrentUser(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user: IUser) => {
      this.user = user;
    });
  }

  getCurrentMember(): void {
    this.memberService
      .getMember(this.user.userName, true)
      .subscribe((member: IMember) => {
        this.member = member;
        this.createEditForm();
      });
  }

  createEditForm(): void {
    this.editForm = this.fb.group({
      description: [this.member?.introduction],
      lookingFor: [this.member?.lookingFor],
      interests: [this.member?.interests],
      city: [this.member?.city],
      country: [this.member?.country],
    });

    const previousFormValue = this.editForm.value;

    this.editForm.valueChanges.subscribe((val) => {
      this.isFormValueChanged = this.isFormChanged(previousFormValue, val);
    });
  }

  updateMember(): void {
    this.memberService.updateMember(this.editForm.value).subscribe((x) => {
      this.isFormValueChanged = false;
      this.getCurrentMember();
      this.toastr.success('Profile updated successfully');
    });
  }

  isFormChanged(previousValue, currentValue): boolean {
    if (_.isEqual(previousValue, currentValue) === false) {
      return true;
    } else {
      return false;
    }
  }
}
