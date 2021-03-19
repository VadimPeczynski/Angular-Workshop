import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Hero } from '../hero-list/hero.model';
import { HeroService } from '../hero-list/hero.service';

function strengthRange(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (
      control.value != null &&
      (isNaN(control.value) || control.value < min || control.value > max)
    ) {
      return { strengthRange: true };
    }
    return null;
  };
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
  inputType = 'password';
  id: number = null;
  heroForm: FormGroup;
  isSubmitted = false;
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
  nameValueSubs = new Subscription();

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
      strength: [0, strengthRange(0, 5)],
      description: '',
      active: true,
    });
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.pageTitle = this.id ? 'Edycja herosa' : 'Dodawanie herosa';
    if (this.id) {
      this.heroService.getHero(this.id).subscribe((hero: Hero) => {
        this.hero = { ...hero };
        this.heroForm.patchValue({
          name: hero.name,
          team: hero.team,
          secretIdentity: hero.secretIdentity,
          salary: hero.salary,
          strength: hero.strength,
          description: hero.description,
        });
      });
    }
    const nameControl = this.heroForm.get('name');
    this.nameValueSubs = nameControl.valueChanges.subscribe(
      (value: boolean) => {
        this.setErrorMessage(nameControl);
      }
    );
  }

  setErrorMessage(control: AbstractControl): void {
    this.nameErrorMessage = '';
    if (this.isSubmitted && control.errors) {
      this.nameErrorMessage = Object.keys(control.errors)
        .map((key) => this.validationMessages[key])
        .join(', ');
    }
  }

  onIconClick(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.inputType = this.isPasswordVisible ? 'text' : 'password';
  }

  onCancelClick(): void {
    this.router.navigate(['/heroes']);
  }

  onNameBlur(): void {
    if (this.heroForm.get('name').invalid) {
      console.warn('Nazwa niepoprawna');
    }
  }

  onSubmit(): void {
    this.isSubmitted = true;
    const nameControl = this.heroForm.get('name');
    this.setErrorMessage(nameControl);
    if (this.heroForm.valid) {
      const hero = { ...this.hero, ...this.heroForm.value };
      if (!this.hero.id) {
        this.heroService.createHero(hero).subscribe(() => {
          this.router.navigate(['/heroes']);
        });
      } else {
        this.heroService.updateHero(hero).subscribe(() => {
          this.router.navigate(['/heroes']);
        });
      }
    }
  }
}
