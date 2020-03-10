import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditTemplateComponent } from './user-edit-template.component';

describe('UserEditTemplateComponent', () => {
  let component: UserEditTemplateComponent;
  let fixture: ComponentFixture<UserEditTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
