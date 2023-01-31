import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadQuizComponent } from './lead-quiz.component';

describe('LeadQuizComponent', () => {
  let component: LeadQuizComponent;
  let fixture: ComponentFixture<LeadQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
