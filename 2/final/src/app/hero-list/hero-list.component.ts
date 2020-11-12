import { Component, OnInit } from '@angular/core';
import { Hero } from './hero.model';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
})
export class HeroListComponent implements OnInit {
  pageTitle: string = 'Lista Herosów';
  showLogo: boolean = false;
  showAlert = false;
  alertText = '';
  filteredHeroes: Hero[] = [];
  heroes: Hero[] = [];

  private _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredHeroes = this.listFilter
      ? this.filterHeroes(this.listFilter)
      : this.heroes;
  }

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroes = this.heroService.getHeroes();
    this.filteredHeroes = this.heroes;
  }

  toggleLogo(): void {
    this.showLogo = !this.showLogo;
  }

  filterHeroes(filterBy: string): Hero[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.heroes.filter((hero: Hero) => {
      return hero.name.toLocaleLowerCase().indexOf(filterBy) !== -1;
    });
  }

  onRatingClick(text: string): void {
    this.showAlert = true;
    this.alertText = text;
  }
}
