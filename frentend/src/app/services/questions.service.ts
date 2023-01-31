import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private _http:HttpClient) { }

  public getQuestionOfQuiz(qid:Number)
  {
    return this._http.get(`http://localhost:8080/question/quiz/all/${qid}`);
  }
  public addQuestion(question :any){
    return this._http.post(`http://localhost:8080/question/`,question);
  }

  public deleteQuestion(questionId :any){
    return this._http.delete(`http://localhost:8080/question/${questionId}`);
  }

  // evaluate quiz 

  public evalQuiz(questions){
    return this._http.post(`http://localhost:8080/question/eval-quiz`,questions);
  }
}
