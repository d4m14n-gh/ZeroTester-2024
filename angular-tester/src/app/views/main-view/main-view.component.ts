import { Component, OnInit } from '@angular/core';
import { Question } from '../../tester/models/questions';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TesterService } from '../../tester/tester.service';
import { QuestionViewComponent } from "../question-view/question-view.component";
import { LearningModeViewComponent } from "../learning-mode-view/learning-mode-view.component";
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent{
  tests: string[] = ["aui-1", "aui-2", "questions2"];
}
