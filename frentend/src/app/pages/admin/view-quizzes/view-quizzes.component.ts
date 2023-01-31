import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
  quizzes :any=[

  ];
  constructor(private _quiz:QuizService) { }

  ngOnInit(): void {
    this._quiz.quiz().subscribe({
    next:  (data:any)=>{
      this.quizzes=data;
      console.log(data);
    },error: (error)=>{
      console.log(error);
      Swal.fire('Error' ,'error leadin data','error');
    }})
    
  }
  deleteQuiz(qid :Number){
   Swal.fire({
     icon:'info',
     title:'Are you sure delete this one ',
     confirmButtonText:'Delete',
     showCancelButton:true,
    }).then((result:any)=>{
      if(result.isConfirmed){

        //delete this quiz  
        this._quiz.deleteQuiz(qid).subscribe(
          {
         next: (data:any)=>{
          this.quizzes = this.quizzes.filter((quiz:any)=> quiz.qid != qid);
          console.log(data)
          Swal.fire('Success','deleted Successfully','success');
         },
         error: (error)=>{
          Swal.fire('error','Error deleting Quiz','error');
          console.log(error);
         }}
         )
      }
    })
  }
}
