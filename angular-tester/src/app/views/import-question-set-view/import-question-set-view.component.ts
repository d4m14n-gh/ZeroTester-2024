import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuestionSetService } from '../../tester/services/question-set.service';
import { Question } from '../../tester/models/questions';
import * as yaml from 'js-yaml';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-import-question-set-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './import-question-set-view.component.html',
  styleUrl: './import-question-set-view.component.css'
})
export class ImportQuestionSetViewComponent {
  importForm: FormGroup;
  file?: File;

  constructor(private questionSetService: QuestionSetService, private fb: FormBuilder){
    this.importForm = this.fb.group({
      qsname: ['', Validators.required],
      qsfile: ['', Validators.required]
    });
  }

  onSubmit() {
    const filename = this.importForm.value['qsname'];
    const reader = new FileReader();
    reader.onload = () => {
      let content = reader.result;
      if (content) {
        let sp = this.getFileName().split('.');
        if (sp[sp.length-1]=="yml"){
          content = JSON.stringify(yaml.load(content as string), null, 2);
          console.log(content as string);
        }
        this.questionSetService.saveFileToIndexedDB(filename, Question.quetionsFromJson(content as string));
      }
    };
    reader.readAsText(this.file!);
    console.log('Formularz przesłany!', this.importForm.value);
  }
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    }
  }
  getFileName(): string {
    if (this.file)
      return this.file.name;
    return "";
  }
}
