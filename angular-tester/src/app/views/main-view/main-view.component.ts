import { Component, OnDestroy, OnInit } from '@angular/core';
import { Question } from '../../tester/models/questions';
import { HttpClient } from '@angular/common/http';
import { map, Subscribable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TesterService } from '../../tester/services/tester.service';
import { QuestionViewComponent } from "../question-view/question-view.component";
import { LearningModeViewComponent } from "../learning-mode-view/learning-mode-view.component";
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { AllQestionsViewComponent } from '../all-qestions-view/all-qestions-view.component';
import { QuestionSetService } from '../../tester/services/question-set.service';
import { FormsModule, NgModel } from '@angular/forms';
import { ImportQuestionSetViewComponent } from "../import-question-set-view/import-question-set-view.component";

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [CommonModule, RouterLink, ImportQuestionSetViewComponent],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent implements OnDestroy{

  //color: string = "rgb("+document.documentElement.style.getPropertyValue('--primary-color-light-raw')+")";
  color: string = "#212121";
  tests: string[] = [];
  subscription: Subscription;
  
  constructor(private http: HttpClient, public questionSetService: QuestionSetService){
    this.subscription = this.questionSetService.questionSetUpdate$.subscribe(() => this.loadTests())
    this.loadTests();
  }

  async loadTests(): Promise<void> {
    this.tests = await this.questionSetService.getAllQuestionSetNames();
  }

  // colorChange(event: Event) {
  //   this.color = (event.target as HTMLInputElement).value as string;
  //   document.documentElement.style.setProperty('--primary-color-light-raw', this.hexToRgb(this.color));
  // }
  // hexToRgb(hex: string): string | null {
  //   hex = hex.replace(/^#/, '');
  //   if (hex.length === 3) {
  //     hex = hex.split('').map(x => x + x).join('');
  //   }
  //   const regex = /^[a-fA-F0-9]{6}$/;
  //   if (!regex.test(hex)) {
  //     return null;
  //   }
  //   const r = parseInt(hex.slice(0, 2), 16);
  //   const g = parseInt(hex.slice(2, 4), 16);
  //   const b = parseInt(hex.slice(4, 6), 16);
  //   return `${r}, ${g}, ${b}`;
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
