import { async, ComponentFixture } from '@angular/core/testing';
import { AddAdvertiserComponent } from './add-advertiser.component';
import { TestUtils } from '../../../test';

describe('AddAdvertiserComponent', () => {
  let instance: AddAdvertiserComponent;
  let fixture: ComponentFixture<AddAdvertiserComponent>;

  beforeEach(async(() => TestUtils.beforeEachCompiler([AddAdvertiserComponent]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
    fixture.detectChanges();
  })));

  describe('#constructor()', () => {
    it('should create', () => {
      expect(instance).toBeTruthy();
    });
  });

  describe('#ngOnInit()', () => {
    it('implements ngOnInit', () => {
      expect(instance.ngOnInit()).toBeUndefined();
    });
  });
});
