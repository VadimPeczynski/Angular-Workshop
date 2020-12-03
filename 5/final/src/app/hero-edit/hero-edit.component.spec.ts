import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from '../hero-list/hero.service';

import { HeroEditComponent } from './hero-edit.component';

describe('HeroEditComponent', () => {
  let component: HeroEditComponent;
  let fixture: ComponentFixture<HeroEditComponent>;
  let activatedRoute: any;
  let router: jasmine.SpyObj<Router>;
  let heroService: jasmine.SpyObj<HeroService>;

  beforeEach(async () => {
    activatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {},
        },
      },
    };
    router = jasmine.createSpyObj('Router', ['navigate']);
    heroService = jasmine.createSpyObj('HeroService', ['getHero', 'getTeams']);
    await TestBed.configureTestingModule({
      declarations: [HeroEditComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Router, useValue: router },
        { provide: HeroService, useValue: heroService },
      ],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
