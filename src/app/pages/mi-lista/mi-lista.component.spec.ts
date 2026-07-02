import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiListaComponent } from './mi-lista.component';

describe('MiListaComponent', () => {
  let component: MiListaComponent;
  let fixture: ComponentFixture<MiListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
