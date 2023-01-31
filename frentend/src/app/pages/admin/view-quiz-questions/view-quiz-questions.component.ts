import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
    qId:number;
    qTitle:string;
    questions:any =[];
  constructor(private _route:ActivatedRoute,private _question:QuestionsService , private _snack :MatSnackBar) { }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    this.qTitle=this._route.snapshot.params['title'];
     console.log(this.qId);
     console.log(this.qTitle);
     
    this._question.getQuestionOfQuiz(this.qId).subscribe({
      next:(data:any)=>{
      this.questions=data;
      console.log(data) },

    error:(error)=>{
      console.log(error);
    }})

  }
  public deleteQuestion(qid :any){
      Swal.fire({
        icon:'info',
        showCancelButton:true,
        confirmButtonText:'delete',
        title:'are you sure , to delete this question'
      }).then((result)=>{
        if(result.isConfirmed){
          this._question.deleteQuestion(qid).subscribe({
            next:(data: any)=>{
                this._snack.open('question deleted ','',{
                 duration:3000
                });
                this.questions=this.questions.filter((q)=>q.quesId==qid)
            },
            error:(error)=>{
              this._snack.open('error deleting Question ','',{
                duration:3000,
              })
            }
          })
        }
      })
  }

}
