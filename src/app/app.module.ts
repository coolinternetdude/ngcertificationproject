import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { StandingsComponent } from './standings/standings.component';
import { Routes, RouterModule } from '@angular/router';
import { ErrorUtilsComponent } from './error-utils/error-utils.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'league/:code',
        component: StandingsComponent,
      },
    ],
  },
  {
    path: 'fixtures/:leaguecode/:teamcode',
    component: FixturesComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StandingsComponent,
    ErrorUtilsComponent,
    FixturesComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
