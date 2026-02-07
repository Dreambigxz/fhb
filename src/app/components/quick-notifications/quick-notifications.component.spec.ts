import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickNotificationsComponent } from './quick-notifications.component';

describe('QuickNotificationsComponent', () => {
  let component: QuickNotificationsComponent;
  let fixture: ComponentFixture<QuickNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickNotificationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
