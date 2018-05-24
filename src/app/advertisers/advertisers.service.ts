import { Injectable } from '@angular/core';
import { Advertiser } from '../shared/advertiser.model';
import { ApiService } from '../shared/api.service';
import { Observable, forkJoin, Subject } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

import * as _ from 'lodash';
import * as moment from 'moment';


@Injectable()

export class AdvertisersService {

  // convertr services
  private api: ApiService;
  private _advertisers: Array<Advertiser>;

  /**
   * Service responsible for mainting the state of advertisers
   *
   * @param {ApiService} api
   */
  constructor(api: ApiService) {
    this.api = api;
  }

  // observer against the advertisers array, used to update the Data Table in AdvertisersComponent
  public observatory: Subject<Array<Advertiser>> = new Subject();

  /**
   * Grab advertisers from the API - caller must subscribe
   *
   * @returns {Observable<Array<Advertiser>>}
   */
  public fetchAdvertisers(): Observable<Array<Advertiser>> {
    return this.api.getAdvertisers()
      .pipe(
        flatMap(advertisers => this.fetchAddresses(advertisers)),
        map(advertisers => this.advertisers = advertisers)
      );
  }

  /**
   * Add advertisers to the API
   *   - note API returns 201 with null response, so the subscriber will receive null
   *
   * @param {Advertiser} advertiser
   * @returns {Observable<Array<Advertiser>>}
   */
  public add(advertiser: Advertiser): Observable<Array<Advertiser>> {

    // we need to add all the advertisers and addresses separately
    advertiser.id = this._advertisers.length + 1;
    advertiser.updatedTs = moment().format();
    this.advertisers = this._advertisers.concat([advertiser]);
    return forkJoin([
      this.api.setAdvertisers(_.without(this._advertisers, 'addressResolved')),
      this.api.setAddresses(this._advertisers.map(adv => adv.addressResolved))
    ]);
  }

  //
  // Private functions
  //

  /**
   * Given an array of advertisers, fetch the address for each one (each will have an individual API call)
   *
   * @param {Array<Advertiser>} advertisers
   * @returns {Observable<Array<Advertiser>>}
   */
  private fetchAddresses(advertisers: Array<Advertiser>): Observable<Array<Advertiser>> {
    return forkJoin(advertisers.map(advertiser => this.fetchAddress(advertiser)));
  }

  /**
   * Core fetchAddress function used by fetchAddresses
   *
   * @param advertiser
   * @returns {Observable<Advertiser>}
   */
  private fetchAddress(advertiser): Observable<Advertiser> {
    return this.api.getAdvertiserAddress(advertiser.address.split('/')[2])
      .pipe(
        map(address => {
          advertiser.addressResolved = address;
          return advertiser;
        })
      );
  }

  /**
   * Set the internal advertisers array and trigger the observatory
   *
   * @param {Array<Advertiser>} advertisers
   */
  private set advertisers(advertisers: Array<Advertiser>) {
    this._advertisers = advertisers;
    this.observatory.next(advertisers);
  }
}

