import { async, ComponentFixture } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { TestUtils } from '../../../test';

describe('HeaderComponent', () => {
  let instance: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => TestUtils.beforeEachCompiler([HeaderComponent]).then(compiled => {
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
