import { TesterService } from '../../tester/services/tester.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Question } from '../../tester/models/questions';
import { QuestionSetService } from '../../tester/services/question-set.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-all-qestions-view',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './all-qestions-view.component.html',
    styleUrl: './all-qestions-view.component.css'
})
export class AllQestionsViewComponent implements OnInit{
  questionSetName: string = ""
  questions?: Question[];
  constructor(public questionSetService: QuestionSetService, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    let name = this.route.snapshot.paramMap.get('filename');
    if (name)
      this.questionSetName =name;
      this.loadQuestions2(this.questionSetName);
  }
  getLetter(index: number): string{
    return String.fromCharCode(65 + index);
  }
  loadQuestions2(fileName: string): void {
    this.questionSetService.getQuestionSet(fileName).then(
      questions => {
        this.questions = questions;
      }
    );
  }
}
