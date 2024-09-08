import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioSessionPage } from './inicio-session.page';

describe('InicioSessionPage', () => {
  let component: InicioSessionPage;
  let fixture: ComponentFixture<InicioSessionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioSessionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
