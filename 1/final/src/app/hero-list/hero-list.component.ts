import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
})
export class HeroListComponent implements OnInit {
  pageTitle: string = 'Lista Herosów';
  heroes: any[] = [
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

  constructor() {}

  ngOnInit(): void {}
}
