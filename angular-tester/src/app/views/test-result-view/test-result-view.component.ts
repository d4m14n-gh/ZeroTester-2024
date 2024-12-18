import { Component } from '@angular/core';
import { TesterService } from '../../tester/services/tester.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-result-view',
  imports: [MatIconModule, CommonModule],
  templateUrl: './test-result-view.component.html',
  styleUrl: './test-result-view.component.css'
})
export class TestResultViewComponent {
  constructor(public tester: TesterService){

  }
}
