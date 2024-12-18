import { Component } from '@angular/core';
import { TesterService } from '../../tester/services/tester.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-test-result-view',
  imports: [MatIconModule, CommonModule],
  templateUrl: './test-result-view.component.html',
  styleUrl: './test-result-view.component.css'
})
export class TestResultViewComponent {
  constructor(public tester: TesterService, private router: Router, private route: ActivatedRoute){

  }
  reduce(){
    this.tester.reduce();
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  restart(){
    this.tester.restart();
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
