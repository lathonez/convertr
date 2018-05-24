import { AdvertisersService } from './advertisers.service';

let advertisers: AdvertisersService = null;

describe('AdvertisersService', () => {

  beforeEach(() => {
    const envMock: any = {
      baseURL: 'TEST_BASE_URL',
      environment: 'TEST_ENV',
      production: false,
    };
    advertisers = new AdvertisersService(null);
  });

  describe('#constructor()', () => {
    it('initialises', () => {
      expect(advertisers).not.toBeNull();
    });
  });
});
