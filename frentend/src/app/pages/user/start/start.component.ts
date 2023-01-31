import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
   qid: any;
   questions =[];
   marksGod  =0 ;
   correctAwnser=0;
   attemted=0;
   isSubmit=false;
   timer:any;

  constructor( private locatioSt:LocationStrategy , private route :ActivatedRoute, private _question :QuestionsService ) { }

  ngOnInit(): void {
    this.preventBackButtom();
    this.qid=this.route.snapshot.params['qid'];
    console.log(this.qid);
    this. leadQuestion();
  }
   public leadQuestion(){
    this._question.getQuestionOfQuiz(this.qid).subscribe({
      next:(data:any)=>{
        
        this.questions=data;
        this.timer=this.questions.length *2 *60;
        this.questions.forEach((q)=>{
          q['givenAwnser']='';
          this.timeStart();
        });
        console.log(this.questions);
      },
      error:(error)=>{
       Swal.fire('Error','error  to leading the All question the quiz ','error');
      }
    })
   }

    preventBackButtom(){
        history.pushState(null,null,location.href);
        this.locatioSt.onPopState(()=>{
          history.pushState(null,null,location.href);
        });
      }
   
      public submitQuiz(){
        Swal.fire({
          title:"Do you went to submit the question  ",
          showCancelButton:true,
          confirmButtonText:`Submit`,
          icon:'info'
        }).then((result)=>{
          if(result.isConfirmed){
            this.evalQuiz();
             
          }else{

          }
         });
        }

        public timeStart(){
          let t =window.setInterval(()=>{
            if(this.timer<=0){
             this.evalQuiz();
              clearInterval(t);
            }else{
               this.timer--;
            }
          },1000);
        }

      public getFormatTime(){
        let mm= Math.floor(this.timer/60);
        let ss=this.timer-mm*60;
        return `${mm} min: ${ss} sec`
      }

      public evalQuiz(){
        this._question.evalQuiz(this.questions).subscribe({
         next: (data :any)=>{
              this.correctAwnser=data.correctAwnser;
              this.marksGod=(data.marksGod).toFixed(2);
              this.attemted=data.attempted;
              this.isSubmit=true;
             console.log(data);
         },
         error:(error)=>{

         }
        })
       // this.questions.forEach((q)=>{
         // this.isSubmit=true;
          //if(q.givenAwnser==q.answer){
            //this.correctAwnser++;
           //const markSingle= this.questions[0].quiz.maxMarks /this.questions.length;
            //this.marksGod += markSingle;
          //}
          //if(q.givenAwnser.trim()!=''){
            //this.attemted++;
          //}
        // });

         //console.log("number of correct question "+this.correctAwnser);
        //console.log("MarkGow " +this.marksGod);
        //console.log("attempted"+this.attemted);
      }

      public printPage(){
          window.print();
      }
}
