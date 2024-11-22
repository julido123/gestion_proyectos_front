import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarIdeaDialogComponentComponent } from './editar-idea-dialog-component.component';

describe('EditarIdeaDialogComponentComponent', () => {
  let component: EditarIdeaDialogComponentComponent;
  let fixture: ComponentFixture<EditarIdeaDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarIdeaDialogComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarIdeaDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
