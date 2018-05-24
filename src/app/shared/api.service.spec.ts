import { ApiService } from './api.service';
import { instance, mock } from 'ts-mockito';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { NgZone } from '@angular/core';
import { interval, of, throwError } from 'rxjs';

describe('ApiService', () => {

  let api: ApiService = null;
  let config: ConfigService = null;
  let http: HttpClient = null;
  let zone: NgZone = null;

  beforeEach(() => {
    config = mock(ConfigService);
    http = mock(HttpClient);
    zone = mock(NgZone);
    api = new ApiService(instance(config), instance(http), instance(zone));
  });

  it('should be created', () => {
    expect(api).toBeTruthy();
  });

  describe('#get / set online', () => {
    it('sets online and emits network state', (done) => {
      api['_online'] = false;

      const doneFn: Function = (() => {
        expect(api['_online']).toBe(true);
        done();
      });

      api.networkStateEmitter.subscribe(doneFn);

      api.online = true;
    });

    it('does not emit if the network state has not changed', () => {

      api['_online'] = false;

      const networkStateListener: Function = (() => {
        throw new Error('ERROR - listener should not have been called');
      });

      api.networkStateEmitter.subscribe(networkStateListener);

      api.online = false;

      expect(api['_online']).toBe(false);
    });

    it('gets online', () => {
      api['_online'] = false;
      expect(api.online).toBe(false);
    });
  });

  describe('#isOfflineError()', () => {
    it('is an offline error', () => {
      expect(ApiService['isOfflineError']({status: 0} as any)).toEqual(true);
    });

    it('is not an offline error', () => {
      expect(ApiService['isOfflineError']({status: 1} as any)).toEqual(false);
    });
  });

  describe('#apiCallPost()', () => {
    it('makes an api call (offline + offline endpoint)', (done) => {
      api['_online'] = false;

      spyOnProperty(api['config'], 'baseURL', 'get').and.returnValue('BASE_URL/');
      spyOn(api['http'], 'post').and.returnValue(of('LOGGED IN'));
      spyOn(api, 'apiResponseHandler' as any).and.callFake(resp => resp);
      api['apiCallPost']({endpoint: 'user/login', body: 'BODY'}).subscribe(
        response => {
          console.log(response);
          expect(response).toEqual('LOGGED IN');
          expect(api['apiResponseHandler']).toHaveBeenCalledWith('LOGGED IN');
          expect(api['http'].post).toHaveBeenCalledWith(
            'BASE_URL/user/login',
            'BODY',
            {}
          );
          done();
        },
        error => done.fail(error)
      );
    });

    it('makes an api call (online + text + timeout)', (done) => {
      api['_online'] = true;

      spyOnProperty(api['config'], 'baseURL', 'get').and.returnValue('BASE_URL/');
      spyOn(api['http'], 'post').and.returnValue(of('LOGGED IN'));
      spyOn(api, 'apiResponseHandler' as any).and.callFake(resp => resp);
      api['apiCallPost']({endpoint: 'onlineOnly', body: 'BODY', responseType: 'text', timeout: 1000}).subscribe(
        response => {
          console.log(response);
          expect(response).toEqual('LOGGED IN');
          expect(api['apiResponseHandler']).toHaveBeenCalledWith('LOGGED IN');
          expect(api['http'].post).toHaveBeenCalledWith(
            'BASE_URL/onlineOnly',
            'BODY',
            {responseType: 'text'}
          );
          done();
        },
        error => done.fail(error)
      );
    });

    it('times out making an api call', (done) => {
      api['_online'] = true;
      ApiService['RETRY_STRATEGY'].scalingDuration = 1;
      spyOnProperty(api['config'], 'baseURL', 'get').and.returnValue('BASE_URL');
      spyOn(api['http'], 'post').and.returnValue(interval(500));
      spyOn(api, 'httpErrorHandler' as any).and.returnValue(throwError('TEST TIMEDOUT'));
      spyOn(api, 'apiResponseHandler' as any).and.callFake(resp => resp);
      api['apiCallPost']({endpoint: 'onlineOnly', body: 'BODY', responseType: 'text', timeout: 1}).subscribe(
        () => done.fail('should be notreached'),
        error => {
          expect(error).toEqual('TEST TIMEDOUT');
          done();
        }
      );
    });

    it('throws when an api error is received (no retry)', (done) => {
      api['_online'] = true;

      spyOnProperty(api['config'], 'baseURL', 'get').and.returnValue('BASE_URL/');
      spyOn(api['http'], 'post').and.returnValue(of('LOGGED IN'));
      spyOn(api, 'apiResponseHandler' as any).and.callFake(() => {
        throw({status: 1337});
      });
      api['apiCallPost']({endpoint: 'onlineOnly', body: 'BODY', responseType: 'text'}).subscribe(
        () => done.fail('should be notreached'),
        error => {
          expect(error.status).toEqual(1337);
          expect(api['http'].post).toHaveBeenCalledTimes(1);
          done();
        }
      );
    });
  });

  describe('#apiResponseHandler()', () => {
    it('handles response', () => {
      api['_online'] = false;
      expect(api['apiResponseHandler']({body: 'DATA'} as any)).toEqual({body: 'DATA'});
      expect(api.online).toEqual(true);
    });
  });

  describe('#httpErrorHandler', () => {
    it('handles http error (offline)', (done) => {
      spyOn(ApiService, 'isOfflineError' as any).and.returnValue(true);
      api['httpErrorHandler']('ERROR' as any).subscribe(
        () => done.fail('should be notreached'),
        error => {
          expect(error).toEqual('Offline');
          expect(ApiService['isOfflineError']).toHaveBeenCalledWith('ERROR');
          done();
        }
      );
    });

    it('handles http error', (done) => {
      spyOn(ApiService, 'isOfflineError' as any).and.returnValue(false);
      api['httpErrorHandler']('ERROR' as any).subscribe(
        () => done.fail('should be notreached'),
        error => {
          expect(error).toEqual('ERROR');
          expect(ApiService['isOfflineError']).toHaveBeenCalledWith('ERROR');
          done();
        }
      );
    });
  });
});
