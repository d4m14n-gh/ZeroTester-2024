import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllQestionsViewComponent } from './all-qestions-view.component';

describe('AllQestionsViewComponent', () => {
  let component: AllQestionsViewComponent;
  let fixture: ComponentFixture<AllQestionsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllQestionsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllQestionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
