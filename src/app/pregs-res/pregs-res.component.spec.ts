import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PregsResComponent } from './pregs-res.component';

describe('PregsResComponent', () => {
  let component: PregsResComponent;
  let fixture: ComponentFixture<PregsResComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PregsResComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PregsResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
