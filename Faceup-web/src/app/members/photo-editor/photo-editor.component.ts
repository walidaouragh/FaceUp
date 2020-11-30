import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { IMember } from 'src/app/_models/IMember';
import { IPhoto } from 'src/app/_models/IPhoto';
import { IUser } from 'src/app/_models/IUser';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss'],
})
export class PhotoEditorComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private memberService: MembersService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user: IUser) => {
      this.user = user;
    });
  }

  @Input() member: IMember;
  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: IUser;

  ngOnInit(): void {
    this.initializeUploader();
  }

  setMainPhoto(photo: IPhoto): void {
    this.memberService.setMainPhoto(photo.photoId).subscribe(() => {
      this.user.photoUrl = photo.url;
      this.accountService.setCurrentUser(this.user);
      this.member.photoUrl = photo.url;
      this.member.photos.forEach((p) => {
        if (p.isMain) {
          p.isMain = false;
        }
        if (p.photoId === photo.photoId) {
          p.isMain = true;
        }
      });
    });
  }

  deletePhoto(photoId: number): void {
    this.memberService.deletePhoto(photoId).subscribe(() => {
      this.member.photos = this.member.photos.filter(
        (x) => x.photoId !== photoId
      );
    });
  }

  fileOverBase(e: any): void {
    this.hasBaseDropzoneOver = e;
  }

  initializeUploader(): void {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.member.photos.push(photo);
      }
    };
  }
}
