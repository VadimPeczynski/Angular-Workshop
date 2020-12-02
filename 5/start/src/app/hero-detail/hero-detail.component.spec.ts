import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Hero } from '../hero-list/hero.model';
import { HeroService } from '../hero-list/hero.service';
import { FistComponent } from '../shared/fist/fist.component';

import { HeroDetailComponent } from './hero-detail.component';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
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
    heroService = jasmine.createSpyObj('HeroService', ['getHero']);
    await TestBed.configureTestingModule({
      declarations: [HeroDetailComponent, FistComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Router, useValue: router },
        { provide: HeroService, useValue: heroService },
      ],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    heroService.getHero.and.returnValue(of({} as Hero));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
