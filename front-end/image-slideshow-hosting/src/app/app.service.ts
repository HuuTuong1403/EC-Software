import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  sendImage(Image: FormData): Observable<Response>{
    return this.httpClient.post<any>('http://localhost:3000/image-upload', Image);
  }
}
