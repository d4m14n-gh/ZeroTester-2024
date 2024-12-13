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
  private submited: boolean = false;
  private questions: Question[] = [];
  private userAnswers: number[][] = [];
  result: number = 0;
  currentTest: string = "";
  currentQestion = 0;
  answeredQestions = 0;
  order: number[] = [];
  private randomOrder? : boolean = true;
  
  constructor(private http: HttpClient){
    
  }

  getUserAnswer(questionIndex: number): number[]{
    if (this.userAnswers&&this.userAnswers[questionIndex])
      return this.userAnswers[questionIndex];
    return [];
  }

  isAnswerSetted(questionIndex: number, answerIndex: number): boolean{
    return (this.getUserAnswer(questionIndex).includes(answerIndex));
  }

  getRandomOrder(n: number): number[]{
    let order = [];
    for (let i = 0; i < n; i++) 
      order.push(i);
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
  }
  getQuestions(): Question[]{
    return this.questions;
  }
  getQuestionCount(): number{
    return this.questions.length;
  }
  getQuestion(index: number): Question{
    return this.questions[index];
  }
  setUserAnswer(questionIndex: number, answer: number) {
    if (this.userAnswers[questionIndex]===undefined)
      this.answeredQestions += 1;
    else
      return;
    if (this.questions[questionIndex].correctAnswers.includes(answer))
      this.result += 1;
    this.userAnswers[questionIndex] = [answer];
  }

  isCorrectAnswer(questionIndex: number, answerIndex: number){
    return this.questions[questionIndex].correctAnswers.includes(answerIndex);
  }
  isCorrectAnswerQ(question: Question, answerIndex: number){
    return question.correctAnswers.includes(answerIndex);
  }

  getAnswerClass(questionIndex: number, answerIndex: number): string{
    if (this.userAnswers[questionIndex]!==undefined){
      if (this.userAnswers[questionIndex].includes(answerIndex)){
        if (this.isCorrectAnswer(questionIndex, answerIndex))
          return "correctAnswer";
        else
          return "wrongAnswer";
      } 
      if (this.isCorrectAnswer(questionIndex, answerIndex))
        return "correctUncheckedAnswer";
    }
    return "";
  }
  submitAnswers(): void{
    
    if (this.userAnswers[this.currentQestion] === undefined)
      return;
    if(this.currentQestion<this.getQuestionCount()-1){
      this.currentQestion += 1;
      this.changeOrder();
    }
    else{
      this.submited = true;
    }
  }

  loadQuestions(fileName: string): void {
    this.currentTest = fileName;
    this.http.get<any[]>('assets/tests/'+fileName+".json")
    .pipe(
      map((data: any) => {
        const questions = data.questions.map(
          (q: any) => {
            let correct_answers: number[] | undefined = undefined;
            let correct_answer: number | undefined = undefined;
            if (Array.isArray(q.correct_answer))
              correct_answers = q.correct_answer;
            else
              correct_answer = q.correct_answer;
            return new Question(q.content, q.answers, correct_answer, correct_answers);
          }
        );
        return questions;
      })
    )
    .subscribe((questions: Question[]) => {
      this.questions = questions;
      this.changeOrder();
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
    this.questions = this.questions.filter((q, i) => !q.correctAnswers.includes(this.userAnswers[i][0]));
    this.restart();
  }

  getPercent(): number {
    if (this.answeredQestions==0)
      return 0;
    return Math.round(this.result/this.answeredQestions*100);
  }

  changeOrder(){
    const question = this.getQuestion(this.currentQestion);
    this.order = [];
    for(let i=0;i<question.answers.length;i++)
      this.order[i] = i;
    if (this.randomOrder)
      this.order = this.getRandomOrder(question.answers.length);
  }
}
