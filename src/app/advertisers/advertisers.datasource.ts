import { DataSource } from '@angular/cdk/table';
import { AdvertisersService } from './advertisers.service';
import { Observable } from 'rxjs';
import { Advertiser } from '../shared/advertiser.model';

export class AdvertisersDatasource extends DataSource<any> {

  private advertiserService: AdvertisersService;

  /**
   * Datasource for the data table in AdvertiserComponent
   *
   * @param {AdvertisersService} advertiserService
   */
  constructor(advertiserService: AdvertisersService) {
    super();
    this.advertiserService = advertiserService;
  }

  /**
   * Bind to the observer on AdvertiserService to render the data table
   *
   * @returns {Observable<Array<Advertiser>>}
   */
  connect(): Observable<Array<Advertiser>> {
    return this.advertiserService.observatory;
  }

  disconnect() {}
}
