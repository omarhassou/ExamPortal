import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
    qid:Number;
    quiz:any
  constructor(private _route:ActivatedRoute , private _quiz:QuizService , private router:Router ) { }

  ngOnInit(): void {
   this.qid= this._route.snapshot.params['qid'];
    console.log(this.qid);
    this._quiz.getQuiz(this.qid).subscribe({
      next:(data :any)=>{
        console.log(data);
        this.quiz=data;
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }
   public startQuiz(){
    Swal.fire({
      title:"Do you went to strat the quiz ",
      showCancelButton:true,
      confirmButtonText:`Save`,
      denyButtonText:`Don't save`,
      icon:'info'
    }).then((result)=>{
       if(result.isConfirmed){
       this.router.navigate(['/start/'+this.qid]);
       }
       else if(result.isDenied){
        Swal.fire("change are not  Saved ",'', 'success');
       
       }
    })
   }
}
