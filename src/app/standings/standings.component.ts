import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, map, catchError, throwError } from 'rxjs';
import { Standings, standingsResponse } from '../model/standings';
import { FootballService } from '../services/football.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css'],
})
export class StandingsComponent implements OnInit, OnDestroy {
  leagueTable$: Observable<Standings>;
  subscription: Subscription;
  standingsErrorMsg: string;
  currentLeagueCode: number;
  constructor(
    private route: ActivatedRoute,
    private footService: FootballService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(() => {
      this.currentLeagueCode = Number(this.route.snapshot.paramMap.get('code'));
      this.leagueTable$ = this.footService
        .getStandingByLeague(this.currentLeagueCode)
        .pipe(
          map((res: standingsResponse) => {
            return res.response[0].league.standings[0];
          }),
          catchError((err: HttpErrorResponse) => {
            this.standingsErrorMsg = `Error Handling your request, Please try again later`;
            return throwError(() => console.log('ERROR REQUESTING THE SERVER'));
          })
        );
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
