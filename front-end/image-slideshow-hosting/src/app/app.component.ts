import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';

export class Images{
  constructor(
    public imageUrl: String,
  ){}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent implements OnInit{
  image: Images[] = [];
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

    ngOnInit(): void{
      this.getImage();
    }

    getImage(){
      this.http.get<any>('http://localhost:3000/getImage').subscribe(res => {
        const data = res;
        this.image = data;
        data.forEach((url: any) => {
          var obj = {
            image: url,
            thumbImage: url,
          }
          this.imageObject.push(obj);
        });
      })
    }

    onFileChange(event:any){
      this.Image = <File>event.target.files[0];
      this.formdata.append('image', this.Image, this.Image.name);
    }

    onSubmit(event:any){
      event.preventDefault();
      this.http.post<any>('http://localhost:3000/image-upload', this.formdata).subscribe((res)=> console.log(res), (err) => console.log(err));
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }

    clearFile() {
      this.fileInput.nativeElement.value = "";
      this.titleInput.nativeElement.value = "";
    }
}

