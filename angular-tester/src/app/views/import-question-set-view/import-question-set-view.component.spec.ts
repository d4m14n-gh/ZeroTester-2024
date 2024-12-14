import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportQuestionSetViewComponent } from './import-question-set-view.component';

describe('ImportQuestionSetViewComponent', () => {
  let component: ImportQuestionSetViewComponent;
  let fixture: ComponentFixture<ImportQuestionSetViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportQuestionSetViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportQuestionSetViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
