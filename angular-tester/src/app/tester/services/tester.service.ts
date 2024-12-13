import { Injectable, OnInit } from '@angular/core';
import { Question } from '../models/questions';
import { HttpClient } from '@angular/common/http';
import { count, map, range } from 'rxjs';
import { Tester } from '../models/tester';
import { QuestionSetService } from './question-set.service';

enum TesterMode{
  Test = 1,
  Learning = 2
}

@Injectable({
  providedIn: 'root'
})
export class TesterService{
  private tester?: Tester;
  private order: number[] = [];
  currentTest: string = "";
  constructor(private http: HttpClient, private questionSetService: QuestionSetService){
    
  }

  ///getters and setters
  getOrder(): number[] {
    return this.order;
  }
  getQuestionCount(): number {
    return this.tester!.getQuestionsCount();
  }
  getCurrentQuestionNr(): number {
    return this.tester!.getCurrentQuestionNr();
  }
  getCurrentQuestion(): Question { //todo
    return this.tester!.getCurrentQuestion();
  }
  getIsCurrentQuestionSubmited(): boolean {
    return this.tester!.getIsCurrentQuestionSubmited();
  }
  getIsTestEnded(): boolean{
    return this.tester!.getIsTestEnded();
  }
  getResult(): number {
    return this.tester!.getResult();
  }
  getUserAnswersCnt(): number {
      return this.tester!.getUserAnswersCnt();
  }
  getQuestions(): Question[] {
    return this.tester!.getQuestions();
  }
  getPercent(): number {
    if (this.getUserAnswersCnt()==0)
      return 0;
    return Math.round(this.getResult()/this.getUserAnswersCnt()*100);
  }
  goToNextQuestion(): void {
    this.tester!.goToNextQuestion();
    this.changeOrder();
  }

  isTesterSetted(): boolean{
    return this.tester!==undefined;
  }
  isAnswerSetted(answerIndex: number): boolean{
    return (this.tester!.getCurrentQuestionUserAnswers().has(answerIndex));
  }
  switchUserAnswer(answerIndex: number): void {
    this.tester?.switchCurrentQuestionUserAnswer(answerIndex);
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
  submit(): void {
    this.tester!.submitCurrentQuestion();
  }

  getAnswerClass(answerIndex: number): string{
    if (!this.tester || !this.tester.getIsCurrentQuestionSubmited())
      return "";
    if (this.tester.getCurrentQuestionUserAnswers().has(answerIndex)){
      if (this.tester.isCurrentQuestionAnswerCorrect(answerIndex))
        return "correctAnswer";
      else
        return "wrongAnswer";
    } 
    if (this.tester.isCurrentQuestionAnswerCorrect(answerIndex))
      return "correctUncheckedAnswer";
    return "";
  }

  loadQuestions(fileName: string): void {
    this.http.get<any[]>('assets/tests/'+fileName+".json")
    .pipe(map((data: any) => data.questions.map(Question.fromJson)))
    .subscribe((questions: Question[]) => {
      this.currentTest = fileName;
      if (questions)
        this.tester = new Tester(questions);
      this.changeOrder();
    });
  }
  loadQuestions2(fileName: string): void {
    this.questionSetService.getQuestionSet(fileName).then(
      questions => {
        this.currentTest = fileName;
        if (questions)
          this.tester = new Tester(questions);
        this.changeOrder();
      }
    );
  }

  // restart(): void {
  //   this.userAnswers = new Array(this.getQuestionCount()).fill(undefined);
  //   this.currentQestion=0;
  //   this.answeredQestions=0;
  //   this.result=0;
  // }

  // reduce(): void {
  //   this.questions = this.questions.filter((q, i) => !q.correctAnswers.includes(this.userAnswers[i][0]));
  //   this.restart();
  // }



  changeOrder(){
    const answersCnt: number = this.getCurrentQuestion().answers.length;
    this.order = [];
    for(let i=0;i<answersCnt;i++)
      this.order[i] = i;
    this.order = this.getRandomOrder(answersCnt);
  }
}
