import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaComprobantes } from './lista-comprobantes';

describe('ListaComprobantes', () => {
  let component: ListaComprobantes;
  let fixture: ComponentFixture<ListaComprobantes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaComprobantes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaComprobantes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
