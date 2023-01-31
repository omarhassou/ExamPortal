import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  categories=[]  as any;
  quizData:any={
    title:"",
    description:"",
    maxMark:"",
    numberOfQuestion:"",
    active:true,
    category: {
      cid:'',
    },
  };
  constructor(private _cat:CategoryService , private _snack:MatSnackBar ,private _quiz:QuizService , private router:Router) { }

  ngOnInit(): void {
    this._cat.categories().subscribe({
     next: (data:any)=>{
      this.categories=data;
    },
   error: (error)=>{
      console.log(error);
      Swal.fire('Error','error i leadin data','error');
    }})
  }
   addQuiz(){
      if(this.quizData.title.trim()=='' || this.quizData.title==null){
          this._snack.open("this title is required !!","",{
            duration:3000,
          });
          return;
      }
       // send data to server 
       this._quiz.addQuiz(this.quizData).subscribe({
         next: (data:any)=>{
       this.quizData=data;
        console.log(this.quizData);
        Swal.fire('Seccess' ,'the quiz is added ','success').then((e)=>{
          this.router.navigate(['/admin/quizzes'])
        });
       },error:(error)=>{
        console.log(error);
        Swal.fire('Error' ,'error sending data to serve ','error');
       }
      })
   }
}
