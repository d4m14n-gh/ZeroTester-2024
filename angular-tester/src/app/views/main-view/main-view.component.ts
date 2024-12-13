import { Component, OnInit } from '@angular/core';
import { Question } from '../../tester/models/questions';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TesterService } from '../../tester/services/tester.service';
import { QuestionViewComponent } from "../question-view/question-view.component";
import { LearningModeViewComponent } from "../learning-mode-view/learning-mode-view.component";
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { AllQestionsViewComponent } from '../all-qestions-view/all-qestions-view.component';
import { QuestionSetService } from '../../tester/services/question-set.service';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [CommonModule, RouterLink, AllQestionsViewComponent],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent{
constructor(private http: HttpClient, public questionSetService: QuestionSetService){
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


  save(event: Event): void{
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
       reader.onload = () => {
        const content = reader.result;
        if (content) {
          this.questionSetService.saveFileToIndexedDB(file.name, content as string);
        }
      };
      reader.readAsText(file);
      // Odczyt pliku jako Binary Large Object (Blob)
      // const reader = new FileReader();
      // reader.onload = () => {
      //   const fileData = reader.result;
      //   if (fileData && this.db) {
      //     this.saveFileToIndexedDB(file.name, fileData as ArrayBuffer);
      //   }
      // };
      // reader.readAsArrayBuffer(file); // Czytamy plik jako ArrayBuffer
    }
  }
}
