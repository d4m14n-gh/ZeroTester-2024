import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundViewComponent } from './page-not-found-view.component';

describe('PageNotFoundViewComponent', () => {
  let component: PageNotFoundViewComponent;
  let fixture: ComponentFixture<PageNotFoundViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNotFoundViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageNotFoundViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
