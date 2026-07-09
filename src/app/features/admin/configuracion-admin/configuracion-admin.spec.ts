import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionAdmin } from './configuracion-admin';

describe('ConfiguracionAdmin', () => {
  let component: ConfiguracionAdmin;
  let fixture: ComponentFixture<ConfiguracionAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguracionAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracionAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
