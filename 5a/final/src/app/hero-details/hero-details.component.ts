import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../hero-list/hero.model';
import { HeroService } from '../hero-list/hero.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss'],
})
export class HeroDetailsComponent implements OnInit {
  pageTitle = 'Informacje o herosie';
  hero = {} as Hero;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe((hero: Hero) => {
      this.hero = hero;
    });
  }

  onClick(): void {
    this.router.navigate(['/heroes']);
  }
}
