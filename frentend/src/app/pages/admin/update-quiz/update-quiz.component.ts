import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
   qId:any =0;
   quiz :any;
   categories :any
  constructor(private _route:ActivatedRoute, private _quiz :QuizService ,private _cat:CategoryService,private router: Router) { }

  ngOnInit(): void {
    this._cat.categories().subscribe((data:any)=>{
      this.categories=data;
      console.log(data);
    },
    (error)=>{
      console.log(error);
      
    });
    this.qId=this._route.snapshot.params['qid'];
    this._quiz.getQuiz( this.qId).subscribe(
      (data: any)=>{
       this.quiz=data;
       console.log(data);
      },(error)=>{
        console.log(error);
      })  
    }
    public updateQuiz(){
      this._quiz.updateQuiz(this.quiz).subscribe((data:any)=>{
          Swal.fire('Success','update Quiz successufly','success').then((e)=>{
            this.router.navigate(['/admin/quizzes']);
          });
          
        
      },(error)=>{
        console.log(error);
        Swal.fire('Error','error Update quiz ','error');
      });
    }

}
