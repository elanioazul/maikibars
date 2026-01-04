import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorMap } from './visor-map';

describe('VisorMap', () => {
  let component: VisorMap;
  let fixture: ComponentFixture<VisorMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisorMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisorMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
