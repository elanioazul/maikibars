import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorHeader } from './visor-header';

describe('VisorHeader', () => {
  let component: VisorHeader;
  let fixture: ComponentFixture<VisorHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisorHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisorHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
