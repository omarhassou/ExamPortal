
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-lead-quiz',
  templateUrl: './lead-quiz.component.html',
  styleUrls: ['./lead-quiz.component.css']
})
export class LeadQuizComponent implements OnInit {
   catId :any ;
   quizzes:any
   
  constructor( private _router :ActivatedRoute , private _quiz: QuizService) { }

  ngOnInit(): void {
    this.catId =this._router.snapshot.params['catId'];
    this._router.params.subscribe((params :any)=>{
      this.catId=params.catId;

    if(this.catId==0){
      console.log('lead all quizzes');
      this._quiz.getQuizzesActive().subscribe({
        next:(data: any)=>{
         this.quizzes=data;
         console.log(this.quizzes);
        },
        error:(error)=>{
         console.log(error);
         alert('error the leading the all quizzes');
        }
      });
    }else{
      console.log('lead specific quizz');
       this._quiz.getQuizzCategoryActive(this.catId).subscribe({
        next:(data:any)=>{
         this.quizzes=data;
         console.log(this.quizzes);
        },
        error:(error)=>{
          console.log(error);
        }
       })
       
    }
  });
  }
}
