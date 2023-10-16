import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fixture } from '../model/fixtures';
import { catchError, map, Subscription, throwError } from 'rxjs';
import { FootballService } from '../services/football.service';
import { ResponseFixture } from '../model/fixtures';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css'],
})
export class FixturesComponent implements OnInit, OnDestroy {
  teamFixtures: Fixture[];
  currentLeagueCode: number;
  fixtureErrorMsg: string;
  routeSubscription: Subscription;
  serviceSubscription: Subscription;
  constructor(
    private footService: FootballService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(() => {
      this.currentLeagueCode = +this.route.snapshot.paramMap.get('leaguecode');
      const teamcode = +this.route.snapshot.paramMap.get('teamcode');
      this.serviceSubscription = this.footService
        .getFixtuesByTeam(teamcode, this.currentLeagueCode)
        .pipe(
          map((res: ResponseFixture) => {
            return res.response.map((fixture) => {
              return { teams: fixture.teams, goals: fixture.goals };
            });
          }),
          catchError((err: HttpErrorResponse) => {
            this.fixtureErrorMsg = err.message;
            return throwError(() => console.log(err.message));
          })
        )
        .subscribe((response: Fixture[]) => {
          this.teamFixtures = response;
        });
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.serviceSubscription.unsubscribe();
  }
}
