import { Component, OnInit } from '@angular/core';
import { TesterService } from '../../tester/tester.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-qestions-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-qestions-view.component.html',
  styleUrl: './all-qestions-view.component.css'
})
export class AllQestionsViewComponent implements OnInit{
  testName: string = ""
  constructor(public tester: TesterService, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    let name = this.route.snapshot.paramMap.get('filename');
    if (name)
      this.testName =name;
      this.tester.loadQuestions(this.testName);
  }
  getLetter(index: number): string{
    return String.fromCharCode(65 + index);
  }
}
