import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Logger } from './logger';
import { RetryStrategyOpts, Utils } from './utils';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retryWhen, timeout } from 'rxjs/operators';
import {Advertiser, AdvertiserAddress} from './advertiser.model';

export interface ApiCallObj {
  body?:       {};
  endpoint?:   string;
  responseType?: string;
  timeout?:    number;
}

@Injectable()
export class ApiService {

  // used to decide how / when we retry requests
  private static RETRY_STRATEGY: RetryStrategyOpts = {
    maxRetryAttempts: 3,
    excludedCodes: [401, 403, 1337],
    scalingDuration: 500
  };

  // flag whether we're online
  private _online: boolean;

  // vendor services
  private http: HttpClient;
  private zone: NgZone;

  // convertr services
  private config: ConfigService;

  public networkStateEmitter: EventEmitter<boolean> = new EventEmitter<boolean>(); // ApiService decides whether we're online or offline

  constructor(config: ConfigService, http: HttpClient, zone: NgZone) {
    this.config = config;
    this.http = http;
    this.zone = zone;
  }

  //
  // Public API
  //

  public get online(): boolean {
    return this._online;
  }

  /**
   * Set online status, emitting from the networkStateEmitter if the state has changed
   *
   * @param {boolean} online
   */
  public set online(online: boolean) {
    if (this._online === online) {
      // already set
      return;
    }

    Logger.log('ApiService', `${online ? 'Online!' : 'Offline!'}`, Logger.WARN);
    this._online = online;

    this.networkStateEmitter.emit(online);
  }

  /**
   * Get an address for a single advertiser (by ID)
   *
   * @param {string} addressId
   * @returns {Observable<AdvertiserAddress>}
   */
  public getAdvertiserAddress(addressId: string): Observable<AdvertiserAddress> {
    return this.apiCallGet({
      endpoint: `addresses/${addressId}`
    });
  }

  /**
   * Get advertisers from the API
   *
   * @returns {Observable<any>}
   */
  public getAdvertisers(): Observable<Array<Advertiser>> {
    return this.apiCallGet({
      endpoint: 'advertisers'
    });
  }

  /**
   * Send addresses to the API
   *
   * @param {Array<AdvertiserAddress>} addresses
   * @returns {Observable<any>}
   */
  public setAddresses(addresses: Array<AdvertiserAddress>) {
    return this.apiCallPost({
      endpoint: 'addresses',
      body: addresses
    });
  }

  /**
   * Send advertisers to the API
   *
   * @param {Array<Advertiser>} advertisers
   * @returns {Observable<Array<Advertiser>>}
   */
  public setAdvertisers(advertisers: Array<Advertiser>): Observable<Array<Advertiser>> {
    return this.apiCallPost({
      endpoint: 'advertisers',
      body: advertisers
    });
  }

  //
  // Private functions
  //

  /**
   * Figure out if a HttpErrorResponse implies we're offline
   *
   * @param {HttpErrorResponse} error
   * @returns {boolean}
   */
  private static isOfflineError(error: HttpErrorResponse): boolean {

    switch (error.status) {
      case 0:
        return true;
      default:
        return false;
    }
  }

  /**
   * Make a GET request to the API (core function)
   *
   * @param {ApiCallObj} opts
   * @returns {any}
   */
  private apiCallGet(opts: ApiCallObj): Observable<any> {

    // any: https://github.com/angular/angular/issues/18586
    const httpClientOptions: { responseType?: any } = {};

    Logger.log('ApiService.apiCall', 'hitting ' + opts.endpoint);

    if (opts.responseType) {
      // switch on the response type if supplied
      httpClientOptions.responseType = opts.responseType;
    }

    // actually make the request
    return this.http.get(
      this.config.baseURL + opts.endpoint,
      httpClientOptions
    )
      .pipe(
        // check for a timeout
        timeout(opts.timeout || this.config.requestTimeout),

        // pass the successful request through the response handler
        map(data => this.apiResponseHandler(data as any)),

        // retry the request according to the backoff strategy
        retryWhen(Utils.genericRetryStrategy(ApiService.RETRY_STRATEGY)),

        // catch any errors and sned to the httpErrorHandler
        catchError(error => this.httpErrorHandler(error))
      );
  }

  /**
   * Make a POST request to the API (core function)
   *
   * @param {ApiCallObj} opts
   * @returns {any}
   */
  private apiCallPost(opts: ApiCallObj): Observable<any> {

    // any: https://github.com/angular/angular/issues/18586
    const httpClientOptions: { responseType?: any } = {};

    Logger.log('ApiService.apiCall', 'hitting ' + opts.endpoint);

    if (opts.responseType) {
      // switch on the response type if supplied
      httpClientOptions.responseType = opts.responseType;
    }

    // actually make the request
    return this.http.post(
      this.config.baseURL + opts.endpoint,
      opts.body,
      httpClientOptions
    )
      .pipe(
        // check for a timeout
        timeout(opts.timeout || this.config.requestTimeout),

        // pass the successful request through the response handler
        map(data => this.apiResponseHandler(data as any)),

        // retry the request according to the backoff strategy
        retryWhen(Utils.genericRetryStrategy(ApiService.RETRY_STRATEGY)),

        // catch any errors and sned to the httpErrorHandler
        catchError(error => this.httpErrorHandler(error))
      );
  }

  /**
   * Handle a valid HTTP response with an error from the API
   *
   * @param {{error?: {status?: number}}} response
   * @returns {Promise<{}>}
   */
  private apiResponseHandler(response: { error?: {status?: number} }): {} {

    // we've received a legit response from the API, so mark as online
    this.online = true;

    if (!response) {
      return response;
    }

    if (response['hydra:member']) {
      return response['hydra:member'];
    }

    return response;
  }

  /**
   * Handle a HttpError (from http.post)
   *
   * @param {HttpErrorResponse} error
   * @returns {Observable<any>}
   */
  private httpErrorHandler(error: HttpErrorResponse): Observable<any> {

    if (ApiService.isOfflineError(error)) {
      this.online = false;
      return throwError('Offline');
    }

    Logger.log('ApiService.httpErrorHandler', error, Logger.ERROR);
    return throwError(error);
  }
}
