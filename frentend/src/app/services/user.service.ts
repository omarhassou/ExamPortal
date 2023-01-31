import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class UserService {

   public URL='http://localhost:8080/'
  constructor( private http: HttpClient) { }
  

   public addUser(user: any): Observable<Object> {
    return this.http.post(`http://localhost:8080/user/add`, user);
  }
}
