import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitsCreateComponent } from './kits-create.component';

describe('KitsCreateComponent', () => {
  let component: KitsCreateComponent;
  let fixture: ComponentFixture<KitsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
