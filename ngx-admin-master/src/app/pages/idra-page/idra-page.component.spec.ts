import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdraPageComponent } from './idra-page.component';

describe('IdraPageComponent', () => {
  let component: IdraPageComponent;
  let fixture: ComponentFixture<IdraPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdraPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdraPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
