import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../hero-list/hero.model';
import { HeroService } from '../hero-list/hero.service';

function strengthRange(
  control: AbstractControl
): { [key: string]: boolean } | null {
  if (
    control.value != null &&
    (isNaN(control.value) || control.value < 0 || control.value > 5)
  ) {
    return { strengthRange: true };
  }
  return null;
}
@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.scss'],
})
export class HeroEditComponent implements OnInit {
  pageTitle = 'Dodawanie herosa';
  teams = ['Avengers', 'Justice League', 'X-men'];
  isPasswordVisible = false;
  isSubmitted = false;
  inputType = 'password';
  id: number = null;
  heroForm: FormGroup;
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

  nameErrorMessage = '';
  private validationMessages = {
    required: 'Proszę podaj imię bohatera.',
    minlength: 'Imię musi być dłuższe niż 3 litery.',
  };

  constructor(
    private heroService: HeroService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.heroForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      team: [null, Validators.required],
      secretIdentity: '',
      salary: [0, Validators.min(0)],
      strength: [0, strengthRange],
      description: '',
      active: true,
    });
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.pageTitle = this.id ? 'Edycja herosa' : 'Dodawanie herosa';
    if (this.id) {
      this.heroService.getHero(this.id).subscribe((hero: Hero) => {
        this.hero = hero;
        this.heroForm.setValue({
          name: hero.name,
          team: hero.team,
          secretIdentity: hero.secretIdentity,
          salary: hero.salary,
          strength: hero.strength,
          description: hero.description,
          active: hero.active,
        });
      });
    }
  }

  onIconClick(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.inputType = this.isPasswordVisible ? 'text' : 'password';
  }

  setErrorMessage(control: AbstractControl): void {
    this.nameErrorMessage = '';
    if ((control.touched || control.dirty) && control.errors) {
      this.nameErrorMessage = Object.keys(control.errors)
        .map((key) => this.validationMessages[key])
        .join(', ');
    }
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.heroForm.valid) {
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

  onNameBlur(): void {
    const nameControl = this.heroForm.get('name');
    this.setErrorMessage(nameControl);
  }

  onCancelClick(): void {
    this.router.navigate(['/heroes']);
  }
}
