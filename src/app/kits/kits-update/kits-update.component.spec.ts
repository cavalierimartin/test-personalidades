import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitsUpdateComponent } from './kits-update.component';

describe('KitsUpdateComponent', () => {
  let component: KitsUpdateComponent;
  let fixture: ComponentFixture<KitsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
