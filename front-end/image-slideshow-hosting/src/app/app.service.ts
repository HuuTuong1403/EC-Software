import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }
  sendImage(Image: FormData){
    return this.httpClient.post('http://localhost:3000/sendImage', Image);
  }

  upLoadImage(vals:any): Observable<any>{
    let data = vals;
    return this.httpClient.post(
      'https://res.cloudinary.com/university-of-education-technology/image/upload', data
    )
  }
}
