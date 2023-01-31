import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor( private _http:HttpClient) { 
    this._http=_http;
  }
  public quiz(){
    return this._http.get(`http://localhost:8080/quiz/allQuizzes`);
  }

  public addQuiz(quiz :any){
    return this._http.post(`http://localhost:8080/quiz/`,quiz);
  }
  public deleteQuiz(qid :Number){
     return this._http.delete(`http://localhost:8080/quiz/${qid}`);
  }

  public getQuiz(qid:Number){
    return this._http.get(`http://localhost:8080/quiz/${qid}`);
  }

  public updateQuiz(quiz:any){
    return this._http.put(`http://localhost:8080/quiz/`,quiz);
  }

  public getQuizzesOfCategory(catId ){
     return this._http.get(`http://localhost:8080/quiz/category/${catId}`);
  }
  public getQuizzesActive(){
    return this._http.get(`http://localhost:8080/quiz/active`);
  }

  public getQuizzCategoryActive(cid){
    return this._http.get(`http://localhost:8080/quiz/category/active/${cid}`);
  }
}
