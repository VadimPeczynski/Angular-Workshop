import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../hero-list/hero.model';
import { HeroService } from '../hero-list/hero.service';

@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.scss'],
})
export class HeroEditComponent implements OnInit {
  pageTitle = 'Dodawanie herosa';
  teams = ['Avengers', 'Justice League', 'X-men'];
  isPasswordVisible = false;
  inputType = 'password';
  id: number = null;
  hero: Hero = {
    name: null,
    team: null,
    secretIdentity: null,
    salary: 0,
    strength: 0,
    description: '',
    active: false,
    logoUrl: '',
  } as Hero;

  constructor(
    private heroService: HeroService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.pageTitle = this.id ? 'Edycja herosa' : 'Dodawanie herosa';
    if (this.id) {
      this.heroService.getHero(this.id).subscribe((hero: Hero) => {
        this.hero = hero;
      });
    }
  }

  onIconClick(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.inputType = this.isPasswordVisible ? 'text' : 'password';
  }

  onCancelClick(): void {
    this.router.navigate(['/heroes']);
  }
}
