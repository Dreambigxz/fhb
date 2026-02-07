import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetinfoComponent } from './betinfo.component';

describe('BetinfoComponent', () => {
  let component: BetinfoComponent;
  let fixture: ComponentFixture<BetinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
