import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneCreateComponent } from './phone-create.component';

describe('PhoneCreateComponent', () => {
  let component: PhoneCreateComponent;
  let fixture: ComponentFixture<PhoneCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
