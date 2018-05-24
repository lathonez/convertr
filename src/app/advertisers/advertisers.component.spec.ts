import { async, ComponentFixture } from '@angular/core/testing';

import { AdvertisersComponent } from './advertisers.component';
import { TestUtils } from '../../test';
import { AddAdvertiserComponent } from '../shared/add-advertiser/add-advertiser.component';
import { HeaderComponent } from '../shared/header/header.component';
import { AdvertiserAddresssPipe } from './advertiser-address.pipe';

describe('AdvertisersComponent', () => {
  let instance: AdvertisersComponent;
  let fixture: ComponentFixture<AdvertisersComponent>;

  beforeEach(async(() => TestUtils.beforeEachCompiler([
    AdvertisersComponent, AddAdvertiserComponent, HeaderComponent, AdvertiserAddresssPipe
  ]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  describe('#constructor()', () => {
    it('should create', () => {
      expect(instance).toBeTruthy();
    });
  });
});
