import { Component, OnInit } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from "sweetalert2"
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService :UserService , private snack:MatSnackBar, private router :Router) { }
  public user= {
      "id":"",
      "username":"",
      "password":"",
      "firstName":"",
      "lastName":"",
      "email":"",
      "profile":""
  }        
  
  
  ngOnInit(): void {
   
  }

  public onSubmit(){
     console.log(this.user);
     if(this.user.username==''|| this.user.username==null){
    // alert('user is required');
    this.snack.open('this username  is equired','',{
     duration:3000,
    
    })
     return;
     }

     this.userService.addUser(this.user).subscribe(
        (data:any)=>{
          //success
          console.log(data);
          Swal.fire('Success done !!','User ID is :'+data.id,'success').then((e)=>{
            this.router.navigate(['/login']);
          });

        },
        (error)=>{
          //errror 
          console.log(error);
          alert(' Somme thing wrong');

        }
     )
  }

  //add user :service ;
 

  }


