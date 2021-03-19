import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FistComponent } from './fist.component';

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
    it('should set fistWidth with the correct value', () => {
      //Arrange
      component.rating = 5;
      //Act
      component.ngOnChanges();
      //Assert
      expect(component.fistWidth).toBe(60);
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
