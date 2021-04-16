import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'


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
  Image?: File;
  formdata = new FormData();

  constructor(
      private appService: AppService,
      private http: HttpClient,
    ){
    }

    onFileChange(event:any){
      this.Image = <File>event.target.files[0];
      this.formdata.append('image', this.Image, this.Image.name);
      console.log(this.Image);
      console.log(this.formdata);
    }

    onSubmit(event:any){
      event.preventDefault();
      this.http.post<any>('http://localhost:3000/image-upload', this.formdata).subscribe((res)=> console.log(res), (err) => console.log(err));
    }

    clearFile() {
      this.fileInput.nativeElement.value = "";
      this.titleInput.nativeElement.value = "";
    }
}

