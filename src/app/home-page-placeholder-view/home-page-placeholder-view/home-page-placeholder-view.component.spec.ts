import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePagePlaceholderViewComponent } from './home-page-placeholder-view.component';

describe('HomePagePlaceholderViewComponent', () => {
  let component: HomePagePlaceholderViewComponent;
  let fixture: ComponentFixture<HomePagePlaceholderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePagePlaceholderViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePagePlaceholderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
