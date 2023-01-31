import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatCardAvatar } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  [x: string]: any;
 
   LoginData={

    username:'',
    password:''

   }
  constructor( private snack:MatSnackBar , private login:LoginService , private router:Router  ) { }

  ngOnInit(): void {
  }
  FormSubmit(){
  console.log("longin button click");

           if(this.LoginData.username.trim()=='' || this.LoginData.password==null){

            this.snack.open('username is required et password  ','',{
               duration:3000
            } );
          return;
           }
           // requist to server  token 
           this.login.generateToken(this.LoginData).subscribe({
             next: (data:any)=>{
              
              console.log("seccess");
              console.log(data);

              // login users 
               this.login.loginUser(data.token);
               this.login.getUserCurrent().subscribe(
                (user:any )=>{
                 this.login.setUser(user);
                 console.log(user);
                 if(this.login.getUserRole()=='ADMIN'){
                  // dashboard admin
                  //window.location.href='/admin'
                  this.router.navigate(['admin']);
                  this['loginStatutsService']?.next(true);
                 }else if(this.login.getUserRole()=='NORMAL'){
                  // dashboard users 
                 // window.location.href='/user-dashboard'
                 this.router.navigate(['user-dashboard/0'])
                 this['loginStatutsService']?.next(true);
                 } else{
                  this.login.logout();
                  this['loginStatutsService'].next(false);
                 }
                
                });
            },error:(error)=>{
              console.log("somme thing is wrong ");
              console.log(error);
              this.snack.open('Invalid users or password ','',{
              duration:3000
              });
             }
           } );

  }

}
