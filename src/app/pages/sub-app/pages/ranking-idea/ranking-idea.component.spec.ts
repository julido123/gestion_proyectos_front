import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingIdeaComponent } from './ranking-idea.component';

describe('RankingIdeaComponent', () => {
  let component: RankingIdeaComponent;
  let fixture: ComponentFixture<RankingIdeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RankingIdeaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
