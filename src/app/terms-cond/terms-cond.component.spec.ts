import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsCondComponent } from './terms-cond.component';

describe('TermsCondComponent', () => {
  let component: TermsCondComponent;
  let fixture: ComponentFixture<TermsCondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsCondComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermsCondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
