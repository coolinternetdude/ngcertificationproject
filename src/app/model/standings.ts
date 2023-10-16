export interface standingsResponse {
  errors: [];
  get: string;
  pagging: { current: number; total: number };
  parameters: { league: string; season: string };
  response: { league: League };
}

export interface League {
  country: string;
  flag: string;
  id: number;
  logo: string;
  season: number;
  standings: Standings[];
}

export interface Standings {
  standings: TeamStats[];
}

export interface TeamStats {
  all: Stats;
  away: Stats;
  description: string;
  form: string;
  goalsDiff: number;
  group: string;
  home: Stats;
  points: number;
  rank: number;
  status: string;
  team: Team;
}

export interface Stats {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: { for: number; against: number };
}

export interface Team {
  id: number;
  logo: string;
  name: string;
}
