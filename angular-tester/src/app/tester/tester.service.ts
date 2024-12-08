import { Injectable, OnInit } from '@angular/core';
import { Question } from './models/questions';
import { HttpClient } from '@angular/common/http';
import { count, map, range } from 'rxjs';

enum TesterMode{
  Test = 1,
  Learning = 2
}

@Injectable({
  providedIn: 'root'
})
export class TesterService{
  submited: boolean = false;
  questions: Question[] = [];
  userAnswers: (number | undefined)[] = [];
  result: number = 0;
  currentTest: string = "";
  mode: TesterMode = TesterMode.Learning;
  currentQestion = 0;
  answeredQestions = 0;
  
  constructor(private http: HttpClient){
    
  }

  getAnswer(questionIndex: number): (number | undefined){
    return this.userAnswers[questionIndex];
  }
  getQuestionCount(): number{
    return this.questions.length;
  }
  setAnswer(questionIndex: number, answer: number) {
    if(this.mode == TesterMode.Learning){
      if (this.userAnswers[questionIndex]===undefined)
        this.answeredQestions += 1;
      else
        return;
      if (answer==this.questions[questionIndex].correctAnswer)
        this.result += 1;
    }
    else if (this.mode == TesterMode.Test) {
      if (this.submited)
        return;
    }
    this.userAnswers[questionIndex] = answer;
  }

  getAnswerClass(questionIndex: number, answerIndex: number): string{
    if(this.mode == TesterMode.Learning){
      if (this.userAnswers[questionIndex]!==undefined){
        if (this.questions[questionIndex].correctAnswer==answerIndex&&answerIndex!=this.userAnswers[questionIndex])
          return "correctUncheckedAnswer";
        if (answerIndex==this.userAnswers[questionIndex]){
          if (this.questions[questionIndex].correctAnswer == this.userAnswers[questionIndex])
            return "correctAnswer";
          else
            return "wrongAnswer";
        } 
      }
    }
    else if (this.mode == TesterMode.Test) {
      if (this.submited){
        if (this.questions[questionIndex].correctAnswer==answerIndex&&answerIndex!=this.userAnswers[questionIndex])
          return "correctUncheckedAnswer";
        if (answerIndex==this.userAnswers[questionIndex]){
          if (this.questions[questionIndex].correctAnswer == this.userAnswers[questionIndex])
            return "correctAnswer";
          else
            return "wrongAnswer";
        }
      }
    }
    return "";
  }
  submitAnswers(): void{
    if(this.mode == TesterMode.Learning){
      if (this.userAnswers[this.currentQestion] === undefined)
        return;
      if(this.currentQestion<this.getQuestionCount()-1){
        this.currentQestion += 1;
      }
      else{
        this.submited = true;
      }
    }
    else if (this.mode == TesterMode.Test) {
      this.submited = true;
      range(this.questions.length)
      .pipe(count(i => this.userAnswers[i]===this.questions[i].correctAnswer))
      .subscribe(v => this.result = v);
    }
  }

  loadQuestions(fileName: string): void {
    this.currentTest = fileName;
    this.http.get<Question[]>('assets/'+fileName+".json")
    .pipe(
      map((data: any) => {
        const questions = data.questions.map((q: any) => new Question(q.content, q.answers, q.correct_answer));
        return questions;
      })
    )
    .subscribe((questions: Question[]) => {
      this.questions = questions;
    });
    this.restart();
  }

  questionEnded(): boolean{
    return this.answeredQestions==this.getQuestionCount();
  }

  restart(): void {
    this.userAnswers = new Array(this.getQuestionCount()).fill(undefined);
    this.currentQestion=0;
    this.answeredQestions=0;
    this.result=0;
  }

  reduce(): void {
    this.questions = this.questions.filter((q, i) => q.correctAnswer != this.userAnswers[i]);
    this.restart();
  }

  getPercent(): number {
    if (this.answeredQestions==0)
      return 0;
    return Math.round(this.result/this.answeredQestions*100);
  }
}
