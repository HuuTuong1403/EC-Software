import { Component, Input, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent{
  @ViewChild("fileInput") fileInput: ElementRef | any;
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
      image.append('Image', this.Image);
      image.append('upload_preset','angular_cloudinary');
      image.append('cloud_name', 'university-of-education-technology');
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

