import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarscodeComponent } from './marscode.component';

describe('MarscodeComponent', () => {
  let component: MarscodeComponent;
  let fixture: ComponentFixture<MarscodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarscodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarscodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
