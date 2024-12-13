import { Component, OnInit } from '@angular/core';
import { Question } from '../../tester/models/questions';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TesterService } from '../../tester/tester.service';
import { QuestionViewComponent } from "../question-view/question-view.component";
import { LearningModeViewComponent } from "../learning-mode-view/learning-mode-view.component";
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { AllQestionsViewComponent } from '../all-qestions-view/all-qestions-view.component';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [CommonModule, RouterLink, AllQestionsViewComponent],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent{
constructor(private http: HttpClient){
  this.loadTests();
}
  tests: string[] = [];
  loadTests(): void {
    const fileName = "tests.json"
    this.http.get<string[]>('assets/'+fileName)
    .subscribe((tests: string[]) => {
      this.tests = tests.map(str => str.split(".")[0]);
    });
  }
}
