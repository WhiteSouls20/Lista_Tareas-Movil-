import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarNotasPage } from './editar-notas.page';

describe('EditarNotasPage', () => {
  let component: EditarNotasPage;
  let fixture: ComponentFixture<EditarNotasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarNotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
