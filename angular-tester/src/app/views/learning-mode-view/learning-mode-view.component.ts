import { Component, OnInit } from '@angular/core';
import { TesterService } from '../../tester/tester.service';
import { CommonModule } from '@angular/common';
import { QuestionViewComponent } from '../question-view/question-view.component';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-learning-mode-view',
  standalone: true,
  imports: [CommonModule, QuestionViewComponent, RouterLink],
  templateUrl: './learning-mode-view.component.html',
  styleUrl: './learning-mode-view.component.css'
})
export class LearningModeViewComponent implements OnInit{
  constructor(public tester: TesterService, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    let name = this.route.snapshot.paramMap.get('filename');
    if (name)
      this.tester.loadQuestions(name);
  }
}
