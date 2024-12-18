import { TesterService } from '../../tester/services/tester.service';
import { CommonModule } from '@angular/common';
import { QuestionViewComponent } from '../question-view/question-view.component';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-learning-mode-view',
    standalone: true,
    imports: [CommonModule, QuestionViewComponent, RouterLink],
    templateUrl: './learning-mode-view.component.html',
    styleUrl: './learning-mode-view.component.css'
})
export class LearningModeViewComponent implements OnInit{
  testName: string = "";
  constructor(public tester: TesterService, private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('filename') !== null){
      this.testName = this.route.snapshot.paramMap.get('filename')??"404";
      this.tester.loadQuestions2(this.testName);
    }
  }
  finishLearning(): void {
    const currentUrl = this.router.url;
    this.router.navigate([currentUrl, 'result']);
  }
}
