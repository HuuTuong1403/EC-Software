import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent{
  imageObject: Array<object> = [];
  @ViewChild("fileInput") fileInput: ElementRef | any;
  @ViewChild("titleInput") titleInput: ElementRef | any;
  Image!: File | Blob;
    constructor(
      private appService: AppService,
    ){
    }
    onFileChange(event:any){
      this.Image = event.target.files[0];
    }

    onSubmit(event:any){
      var image = new FormData();
      image.append('image', this.Image);
      image.append('thumbImage', this.Image);
      image.append('title', this.titleInput);
      this.imageObject.push(image);
      this.appService.sendImage(image).subscribe((res: any)=>{
        console.log(res);
      });
      this.appService.upLoadImage(image).subscribe(res => {
        if(res){
          console.log(res);
        }
      });
    }

    clearFile() {
      this.fileInput.nativeElement.value = "";
    }
}

