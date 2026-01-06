import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorCard } from './visor-card';

describe('VisorCard', () => {
  let component: VisorCard;
  let fixture: ComponentFixture<VisorCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisorCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisorCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
