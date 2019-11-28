import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitsListComponent } from './kits-list.component';

describe('KitsListComponent', () => {
  let component: KitsListComponent;
  let fixture: ComponentFixture<KitsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
