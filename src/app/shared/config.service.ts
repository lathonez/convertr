import { Injectable } from '@angular/core';
import { Logger } from './logger';
import { environment } from '../../environments/environment';

interface Environment {
  baseURL: string;
  environment: string;
  production: boolean;
}

@Injectable()

export class ConfigService {

  constructor() {
    this.log();
  }

  // when do our requests timeout
  private _requestTimeout: number = 15000;

  //
  // Public API
  //

  /**
   * Get the API baseURL from the environment
   *
   * @returns {string}
   */
  public get baseURL(): string {
    return ConfigService.getEnv().baseURL;
  }

  /**
   * Get the environment
   *
   * @returns {string}
   */
  public get environment(): string {
    return ConfigService.getEnv().environment;
  }

  /**
   * Getter for request timeout
   *
   * @returns {number}
   */
  public get requestTimeout(): number {
    return this._requestTimeout;
  }

  //
  // Private Functions
  //


  /**
   * Just for mocking out env during testing
   * @returns {Environment}
   */
  private static getEnv(): Environment {
    return environment;
  }

  /**
   * Log some debug about the configuration / environment
   */
  private log(): void {
    Logger.log('ConfigService', `environment: ${ConfigService.getEnv().environment}`);
  }
}
