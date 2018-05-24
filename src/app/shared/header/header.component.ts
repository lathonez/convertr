import { Component, OnInit } from '@angular/core';
import { Logger } from '../logger';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /**
   * Angular lifecycle event
   */
  public ngOnInit(): void {
    Logger.log('HeaderComponent', this, Logger.DEBUG);
  }
}
