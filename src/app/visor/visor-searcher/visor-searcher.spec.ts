import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorSearcher } from './visor-searcher';

describe('VisorSearcher', () => {
  let component: VisorSearcher;
  let fixture: ComponentFixture<VisorSearcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisorSearcher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisorSearcher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
