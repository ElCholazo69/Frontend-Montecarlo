import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCancha } from './detalle-cancha';

describe('DetalleCancha', () => {
  let component: DetalleCancha;
  let fixture: ComponentFixture<DetalleCancha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleCancha]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCancha);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
