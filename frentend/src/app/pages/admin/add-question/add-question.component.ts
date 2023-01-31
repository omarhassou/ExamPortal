import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  qId :Number
  qTitle:any
   question ={
       content:'',
       option1:'',
       option2:'',
       option3:'',
       option4:'',
       answer:'',
       quiz:{
      
       }
   };
  constructor( private _question :QuestionsService , private _snack:MatSnackBar, private router :Router , private  _route:ActivatedRoute) { }
   
  ngOnInit(): void {
   this.qId=this._route.snapshot.params['qid'];
   this.qTitle=this._route.snapshot.params['q.title'];
   this.question.quiz['qid']=this.qId;
   console.log(this.qId);
   console.log(this.qTitle);
  }
   public addQuestion( ){
    if(this.question.content.trim()=='' || this.question.content==null){
      this._snack.open('Title is required !!' ,'',{
        duration:3000
      });
      return ;
    }
    this._question.addQuestion(this.question).subscribe({
      next:  (data:any)=>{
          Swal.fire('Seccess','added Question successfully','success');
        },error:(error)=>{
          console.log(error);
        }

      }
    )
   }
}
