import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
})
export class HeroListComponent {
  pageTitle = 'Lista Herosów';
  heroes = [
    {
      id: 1,
      name: 'Iron Man',
      team: 'Avengers',
      secretIdentity: 'Tony Stark',
      salary: '0.99',
      description: 'Man with iron suit',
      strength: 4.2,
    },
    {
      id: 2,
      name: 'Thor',
      team: 'Avengers',
      secretIdentity: 'Thor Odinson',
      salary: '10.99',
      description: 'Norse god of thunder',
      strength: 4.5,
    },
  ];
}
