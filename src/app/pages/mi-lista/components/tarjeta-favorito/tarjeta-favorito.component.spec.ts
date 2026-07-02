import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaFavoritoComponent } from './tarjeta-favorito.component';

describe('TarjetaFavoritoComponent', () => {
  let component: TarjetaFavoritoComponent;
  let fixture: ComponentFixture<TarjetaFavoritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaFavoritoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaFavoritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
