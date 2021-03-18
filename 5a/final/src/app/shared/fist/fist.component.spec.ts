import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FistComponent } from './fist.component';
import * as using from 'jasmine-data-provider';

fdescribe('FistComponent', () => {
  let component: FistComponent;
  let fixture: ComponentFixture<FistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FistComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    const dataProvider = [
      { value: null, expected: 0 },
      { value: 1, expected: 12 },
      { value: 2, expected: 24 },
      { value: 3, expected: 36 },
      { value: 4, expected: 48 },
      { value: 5, expected: 60 },
    ];

    using(dataProvider, ({ value, expected }) => {
      it(`should set fistWidth with ${expected} if rating is ${value}`, () => {
        //Arrange
        component.rating = value;
        //Act
        component.ngOnChanges();
        //Assert
        expect(component.fistWidth).toBe(expected);
      });
    });
  });

  describe('onClick', () => {
    it('should call fistRatingClicked.emit with proper prompt', () => {
      //Arrange
      const rating = 5;
      component.rating = rating;
      spyOn(component.fistRatingClicked, 'emit');
      //Act
      component.onClick();
      //Assert
      expect(component.fistRatingClicked.emit).toHaveBeenCalledWith(
        `Kliknięty rating to: ${rating}`
      );
    });
  });
});
