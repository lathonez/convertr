import { Component, OnInit } from '@angular/core';
import { Logger } from '../logger';

@Component({
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  /**
   * Do something when the page loads
   */
  public ngOnInit(): void {
    Logger.log('PaymentComponent', this, Logger.DEBUG);
  }
}
