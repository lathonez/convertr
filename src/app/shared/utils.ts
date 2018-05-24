'use strict';

import { finalize, mergeMap } from 'rxjs/operators';
import { Logger } from './logger';

import { Observable, throwError, timer } from 'rxjs';

export interface RetryStrategyOpts { excludedCodes?: number[]; maxRetryAttempts?: number; scalingDuration?: number; }

export class Utils {

  /**
   * Used in an observable chain to conditionally retry a given number of attempts, scaling back accordingly, whilst ignoring certain errors
   *
   * Will use a subscription hook to the original observable e.g.
   *
   * somethingThatReturnsAnObservable()
   *   .retryWhen(Utils.genericRetryStrategy({excludeStatusCodes: [1234], maxRetryAttempts: 5, scalingDuration: 200})
   *
   * https://www.learnrxjs.io/operators/error_handling/retrywhen.html
   *
   * @param {number[]} excludedCodes - error.status to ignore
   * @param {number} maxRetryAttempts - how many times to retry
   * @param {number} scalingDuration - how many ms to scale by (e.g. 1000 means the third retry takes 3 seconds)
   * @returns {any}
   */
  public static genericRetryStrategy({ excludedCodes = [], maxRetryAttempts = 3, scalingDuration = 1000 }: RetryStrategyOpts = {}): any {
    return (attempts: Observable<any>) => {
      return attempts.pipe(
        mergeMap((error, i) => {
          const retryAttempt: number = i + 1;
          // if maximum number of retries have been met
          // or response is a status code we don't wish to retry, throw error
          if (retryAttempt > maxRetryAttempts || excludedCodes.find(e => e === error.status)) {
            return throwError(error);
          }
          Logger.log('Utils.genericRetryStrategy', `Attempt ${retryAttempt}: retrying in ${retryAttempt * scalingDuration}ms`);
          // retry after 1s, 2s, etc...
          return timer(retryAttempt * scalingDuration);
        }),
        finalize(() => Logger.log('Utils.genericRetryStrategy', 'done'))
      );
    };
  }
}
