import { Team } from './standings';

export interface ResponseFixture {
  response: Fixture[];
}

export interface Fixture {
  teams: { home: Team; away: Team };
  goals: { home: number; away: number };
}
