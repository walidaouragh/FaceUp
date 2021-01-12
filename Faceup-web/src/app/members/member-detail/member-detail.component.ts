import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { IMember } from 'src/app/_models/IMember';
import { IMessage } from 'src/app/_models/IMessage';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss'],
})
export class MemberDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private membersService: MembersService,
    private toaster: ToastrService,
    private messageService: MessageService
  ) {}

  @ViewChild('memberTabs', { static: true }) memberTabs: TabsetComponent;
  member: IMember;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  activeTab: TabDirective;
  messages: IMessage[] = [];

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.member = data.member;
    });

    this.route.queryParams.subscribe((params) => {
      params?.tab ? this.selectTab(params?.tab) : this.selectTab(0);
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
    ];

    this.galleryImages = this.getImages();
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    this.member.photos.forEach((photo) => {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url,
      });
    });
    return imageUrls;
  }

  onLike(member: IMember): void {
    this.membersService.addLike(member.userName).subscribe(() => {
      this.toaster.success('You have liked' + member.knownAs);
    });
  }

  getThreadMessages(): void {
    this.messageService
      .getMessageThread(this.member.userName)
      .subscribe((response) => {
        this.messages = response;
      });
  }

  onTabActivated(data: TabDirective): void {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
      this.getThreadMessages();
    }
  }

  selectTab(tabId: number): void {
    this.memberTabs.tabs[tabId].active = true;
  }
}
