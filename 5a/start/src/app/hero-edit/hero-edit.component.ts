import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero-list/hero.model';

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

  constructor() {}

  ngOnInit(): void {}

  onIconClick(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.inputType = this.isPasswordVisible ? 'text' : 'password';
  }
}
