import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-utils',
  templateUrl: './error-utils.component.html',
})
export class ErrorUtilsComponent implements OnInit {
  @Input() standingErrorMessage: string;
  @Input() fixtureErrorMessage: string;
  constructor() {}

  ngOnInit() {}
}
