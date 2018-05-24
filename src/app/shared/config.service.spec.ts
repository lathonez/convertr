import { ConfigService } from './config.service';
import { Logger } from './logger';

let config: ConfigService = null;

describe('ConfigService', () => {

  beforeEach(() => {
    const envMock: any = {
      baseURL: 'TEST_BASE_URL',
      environment: 'TEST_ENV',
      production: false,
    };
    config = new ConfigService();
    spyOn(ConfigService as any, 'getEnv').and.returnValue(envMock);
  });

  describe('#constructor()', () => {
    it('initialises', () => {
      expect(config).not.toBeNull();
    });
  });

  describe('#getters', () => {
    it('gets the baseURL', () => {
      expect(config.baseURL).toEqual('TEST_BASE_URL');
    });

    it('gets the environment', () => {
      expect(config.environment).toEqual('TEST_ENV');
    });

    it('gets the requestTimeout', () => {
      expect(config.requestTimeout).toEqual(15000);
    });
  });

  describe('#log()', () => {
    it('logs', () => {
      config['_version'] = 'TEST_VERS';
      spyOn(Logger, 'log');
      config['log']();
      expect(Logger.log).toHaveBeenCalledTimes(1);
    });
  });
});
