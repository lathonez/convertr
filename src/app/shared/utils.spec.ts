import { Utils } from './utils';
import { throwError, of } from 'rxjs';
import { retryWhen } from 'rxjs/operators';

let utils: Utils = null;

describe('Utils', () => {

  beforeEach(function(): void {
    utils = new Utils();
  });

  describe('#constructor()', () => {
    it('initialises', () => {
      expect(utils).toBeDefined();
    });
  });

  describe('#genericRetryStrategy()', () => {
    it('retries', (done) => {
      throwError('ERROR')
        .pipe(retryWhen(Utils.genericRetryStrategy({scalingDuration: 1})))
        .subscribe(
          () => done.fail('should be notreached'),
          error => {
            expect(error).toEqual('ERROR');
            done();
          }
        );
    });

    it('does not retry', (done) => {
      of('NOT ERROR')
        .pipe(retryWhen(Utils.genericRetryStrategy()))
        .subscribe(
          result => {
            expect(result).toEqual('NOT ERROR');
            done();
          },
          error => done.fail(error)
        );
    });
  });
});
