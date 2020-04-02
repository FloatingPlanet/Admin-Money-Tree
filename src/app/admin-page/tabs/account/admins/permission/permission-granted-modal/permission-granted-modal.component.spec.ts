import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionGrantedModalComponent } from './permission-granted-modal.component';

describe('PermissionGrantedModalComponent', () => {
  let component: PermissionGrantedModalComponent;
  let fixture: ComponentFixture<PermissionGrantedModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionGrantedModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionGrantedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
