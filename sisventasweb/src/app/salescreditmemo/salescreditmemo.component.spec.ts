import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalescreditmemoComponent } from './salescreditmemo.component';

describe('SalescreditmemoComponent', () => {
  let component: SalescreditmemoComponent;
  let fixture: ComponentFixture<SalescreditmemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalescreditmemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalescreditmemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
