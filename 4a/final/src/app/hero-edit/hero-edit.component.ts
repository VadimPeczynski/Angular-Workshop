import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Hero } from '../hero-list/hero.model';
import { HeroService } from '../hero-list/hero.service';

@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.scss'],
})
export class HeroEditComponent implements OnInit {
  pageTitle = 'Dodawanie herosa';
  teams$: Observable<string[]>;
  isPasswordVisible: boolean = false;
  secretIdentityType = 'password';
  originalHero: Hero = {
    name: null,
    team: null,
    strength: 0,
    salary: 0,
    active: false,
  } as Hero;
  hero: Hero = { ...this.originalHero };
  constructor(
    private heroService: HeroService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.teams$ = this.heroService.getTeams();
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.heroService.getHero(id).subscribe((hero: Hero) => {
        this.hero = hero;
      });
    }
  }

  onIconClick(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.secretIdentityType = this.isPasswordVisible ? 'text' : 'password';
  }

  onNameBlur(field: NgModel): void {
    if (field.invalid) {
      console.log('Nazwa niepoprawna');
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (!this.hero.id) {
        this.heroService.createHero(this.hero).subscribe(() => {
          this.router.navigate(['/heroes']);
        });
      } else {
        this.heroService.updateHero(this.hero).subscribe(() => {
          this.router.navigate(['/heroes']);
        });
      }
    }
  }

  onCancelClick(): void {
    this.router.navigate(['/heroes']);
  }
}
