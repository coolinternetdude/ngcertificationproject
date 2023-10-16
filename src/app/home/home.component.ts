import { Component, OnInit } from '@angular/core';

export interface Country {
  name: string;
  code: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  countries: Country[] = [
    { name: 'England', code: 39 },
    { name: 'Spain', code: 140 },
    { name: 'Germany', code: 78 },
    { name: 'Italy', code: 135 },
    { name: 'France', code: 61 },
  ];
}
