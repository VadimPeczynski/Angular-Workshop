import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Hero } from './hero.model';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'http://localhost:3001/heroes';

  constructor(private http: HttpClient) {}
  getHeroes(): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(catchError(this.handleError));
  }

  getHero(id: number): Observable<Hero> {
    return this.http
      .get<Hero>(this.heroesUrl + '/' + id)
      .pipe(catchError(this.handleError));
  }

  createHero(hero: Hero): Observable<Hero> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const newHero = { ...hero, id: null };
    return this.http
      .post<Hero>(this.heroesUrl, newHero, { headers })
      .pipe(tap((data) => console.log('createHero: ' + JSON.stringify(data))));
  }

  updateHero(hero: Hero): Observable<Hero> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put<Hero>(url, hero, { headers })
      .pipe(
        tap(() => console.log('updateHero: ' + hero.id)),
        map(() => hero)
      );
  }

  deleteHero(id: number): Observable<{}> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage =
        `Backend zwrócił kod ${error.status}, ` +
        `status text: ${error.statusText}`;
    }
    console.error(error);
    return throwError(errorMessage);
  }
}
