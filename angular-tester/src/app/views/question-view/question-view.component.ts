import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Question } from '../../tester/models/questions';
import { TesterService } from '../../tester/services/tester.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-question-view',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: './question-view.component.html',
    styleUrl: './question-view.component.css'
})
export class QuestionViewComponent {
  @Input() qi: number = 0;
  @Input() question: Question = Question.default();
 


  constructor(public tester: TesterService) {

  }
  getAnswer(index: number): string{
    return this.question.answers[index];
  }
  getLetter(index: number): string{
    return String.fromCharCode(65 + index);
  }
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    if (key === '1' || key === '2' || key === '3' || key === '4' || key === '5' || key === '6' || key === '7' || key === '8') {
      console.log(`Naciśnięto klawisz: ${key}`);
      let answer = Number.parseInt(key)-1;
      //if (answer<this.question.answers.length)
        //this.tester.setUserAnswer(this.qi, answer);
    }
    if (key === 'Enter' || key===' ') {
      console.log(`Naciśnięto klawisz: ${key}`);
      // if(!this.tester.questionEnded()&&this.tester.answeredQestions==this.tester.currentQestion+1)
      //   this.tester.submitAnswers();
    }
  }
}
