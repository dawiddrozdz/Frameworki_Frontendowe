import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AdminRestaurants } from './admin-restaurants';

describe('AdminRestaurants', () => {
  let component: AdminRestaurants;
  let fixture: ComponentFixture<AdminRestaurants>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRestaurants],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminRestaurants);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
