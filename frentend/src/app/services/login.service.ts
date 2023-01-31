import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 

  public loginStatutsService =new Subject<boolean>();

  constructor( private http:HttpClient ) { }


  //login user 

  public getUserCurrent(){
    return this.http.get(`http://localhost:8080/user-current`)
  }

  //generation token 
  public generateToken(LoginData :any){
   
   return this.http.post(`http://localhost:8080/generate-token`,LoginData
   );
  }
  public loginUser(token:any ){
    localStorage.setItem("token",token);
    return true;
  }

  // is login or note

  public isLoggedIn(){
    let tokenStr=localStorage.getItem("token");
    if(tokenStr==undefined  || tokenStr=='' || tokenStr==null){
      return false;
    }else{
      return true;
    }
  }
  //lougOut :remove token  from local storage 

  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return true;
  }

  // function for  getting  Token :

  public getToken(){
    return localStorage.getItem("token");
  }

  //set userDetail :give the detail of our users 

  public setUser(user :any){
   localStorage.setItem('user',JSON.stringify(user));
  }

  //  getting our user 

  public getUser(){
    let userStr=localStorage.getItem("user");
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }
  // get user role 

  public getUserRole(){
    let user=this.getUser();
    return user.authorities[0].authority;
  }
}


