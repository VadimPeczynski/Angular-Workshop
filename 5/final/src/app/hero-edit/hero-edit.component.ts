import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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
export class HeroEditComponent implements OnInit, OnDestroy {
  pageTitle = 'Dodawanie herosa';
  teams$: Observable<string[]>;
  isPasswordVisible: boolean = false;
  secretIdentityType = 'password';
  hero: Hero = {} as Hero;

  heroForm: FormGroup;
  activeValueSubs: Subscription = new Subscription();
  nameValueSubs: Subscription = new Subscription();
  nameErrorMessage: string = '';
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
      salary: [null, Validators.min(0)],
      strength: [0, strengthRange(0, 5)],
      description: '',
      active: false,
    });

    this.activeValueSubs = this.heroForm
      .get('active')
      .valueChanges.subscribe((value: boolean) => {
        this.activeChanged(value);
      });

    const nameControl = this.heroForm.get('name');
    this.nameValueSubs = nameControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value: string) => {
        this.setErrorMessage(nameControl);
      });

    this.teams$ = this.heroService.getTeams();
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.heroService.getHero(id).subscribe((hero: Hero) => {
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

  ngOnDestroy(): void {
    this.activeValueSubs.unsubscribe();
    this.nameValueSubs.unsubscribe();
  }

  onNameBlur(): void {
    const nameControl = this.heroForm.get('name');
    this.setErrorMessage(nameControl);
  }

  onIconClick(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.secretIdentityType = this.isPasswordVisible ? 'text' : 'password';
  }

  activeChanged(value: boolean): void {
    const salaryControl = this.heroForm.get('salary');
    if (value) {
      salaryControl.setValidators([Validators.required, Validators.min(0)]);
    } else {
      salaryControl.setValidators(Validators.min(0));
    }
    salaryControl.updateValueAndValidity();
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

  onCancelClick(): void {
    this.router.navigate(['/heroes']);
  }
}
