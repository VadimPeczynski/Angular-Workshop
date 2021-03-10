import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Hero } from './hero.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'http://localhost:3001/heroes';

  constructor(private http: HttpClient) {}
  getHeroes(): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(tap((data) => console.log('All: ' + JSON.stringify(data))));
  }
}
