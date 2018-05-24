import { async, ComponentFixture } from '@angular/core/testing';
import { TestUtils } from '../../../test';
import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let instance: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async(() => TestUtils.beforeEachCompiler([PageNotFoundComponent]).then(compiled => {
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
