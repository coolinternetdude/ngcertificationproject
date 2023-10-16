import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { standingsResponse } from '../model/standings';
import { Observable, of, tap } from 'rxjs';
import { ResponseFixture } from '../model/fixtures';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FootballService {
  private standingsData: { [leaguecode: number]: standingsResponse } = {};
  private fixtureData: { [team: number]: ResponseFixture } = {};
  constructor(private http: HttpClient) {}

  getStandingByLeague(leagueCode: number): Observable<standingsResponse> {
    const currentYear = new Date().getFullYear();

    if (this.standingsData[leagueCode]) {
      return of(this.standingsData[leagueCode]);
    } else {
      return this.http
        .get<standingsResponse>('https://v3.football.api-sports.io/standings', {
          params: new HttpParams()
            .set('league', leagueCode)
            .set('season', currentYear),
          headers: new HttpHeaders({
            'x-rapidapi-key': environment.API_KEY,
          }),
        })
        .pipe(
          tap((resData: standingsResponse) => {
            console.log(resData);
            this.standingsData[leagueCode] = resData;
          })
        );
    }
  }

  getFixtuesByTeam(
    teamCode: number,
    leagueCode: number
  ): Observable<ResponseFixture> {
    if (this.fixtureData[teamCode]) {
      return of(this.fixtureData[teamCode]);
    } else {
      return this.http
        .get<ResponseFixture>('https://v3.football.api-sports.io/fixtures', {
          params: new HttpParams()
            .set('league', leagueCode)
            .set('team', teamCode)
            .set('last', 10)
            .set('status', 'ft'),
          headers: new HttpHeaders({
            'x-rapidapi-key': environment.API_KEY,
          }),
        })
        .pipe(
          tap((resData: ResponseFixture) => {
            console.log(resData);
            this.fixtureData[teamCode] = resData;
          })
        );
    }
  }
}
