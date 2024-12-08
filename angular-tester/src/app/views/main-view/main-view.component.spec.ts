import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainViewComponent } from './main-view.component';
import { LearningModeViewComponent } from '../learning-mode-view/learning-mode-view.component';

describe('MainViewComponent', () => {
  let component: MainViewComponent;
  let fixture: ComponentFixture<MainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainViewComponent, LearningModeViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
