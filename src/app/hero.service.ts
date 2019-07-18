import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
    private heroesUrl = 'api/heroes';  // URL to web api
    
    
  /*getHeroes(): Hero[] {
    return HEROES;
  }
  getHeroes(): Observable<Hero[]> {
      // TODO: send the message _after_ fetching the heroes
  this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }
    getHero(id: number): Observable<Hero> {
      // TODO: send the message _after_ fetching the hero
      this.messageService.add(`HeroService: fetched hero id=${id}`);
      return of(HEROES.find(hero => hero.id === id));
    }
  
  */
  /** PUT: update the hero on the server */
    updateHero (hero: Hero): Observable<any> {
        const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
      return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
    }
    
    
  /** GET hero by id. Will 404 if id not found */
getHero(id: number): Observable<Hero> {
      const url = `${this.heroesUrl}/${id}`;
      return this.http.get<Hero>(url).pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
    }
  /** GET heroes from the server */
   getHeroes (): Observable<Hero[]> {
      return this.http.get<Hero[]>(this.heroesUrl)
        .pipe(
          tap(_ => this.log('fetched heroes')),
          catchError(this.handleError<Hero[]>('getHeroes', []))
        );
    }
    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

    /** Log a HeroService message with the MessageService */
private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
}

  constructor(
  private http: HttpClient,
  private messageService: MessageService) { }
}