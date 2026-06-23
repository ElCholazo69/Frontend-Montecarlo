import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearConsulta } from './crear-consulta';

describe('CrearConsulta', () => {
  let component: CrearConsulta;
  let fixture: ComponentFixture<CrearConsulta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearConsulta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearConsulta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
