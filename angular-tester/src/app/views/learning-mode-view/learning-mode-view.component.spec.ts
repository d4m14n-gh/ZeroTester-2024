import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningModeViewComponent } from './learning-mode-view.component';

describe('LearningModeViewComponent', () => {
  let component: LearningModeViewComponent;
  let fixture: ComponentFixture<LearningModeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningModeViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearningModeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
