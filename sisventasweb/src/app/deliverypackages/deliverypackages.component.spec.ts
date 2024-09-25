import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverypackagesComponent } from './deliverypackages.component';

describe('DeliverypackagesComponent', () => {
  let component: DeliverypackagesComponent;
  let fixture: ComponentFixture<DeliverypackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliverypackagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliverypackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
