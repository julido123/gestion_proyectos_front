import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificarIdeaComponent } from './calificar-idea.component';

describe('CalificarIdeaComponent', () => {
  let component: CalificarIdeaComponent;
  let fixture: ComponentFixture<CalificarIdeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalificarIdeaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalificarIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
