import { async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TestUtils } from '../test';

let fixture: ComponentFixture<AppComponent> = null;
let instance: AppComponent = null;

describe('AppComponent', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([AppComponent], TestUtils.COMPILER.app).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
    fixture.detectChanges();
  })));

  describe('#constructor()', () => {
    it('should create the app', async(() => {
      expect(fixture).not.toBeNull();
      expect(instance).not.toBeNull();
    }));

    it('should embed a router outlet', async(() => {
      expect(fixture.debugElement.nativeElement.querySelector('router-outlet')).not.toBeNull();
    }));
  });
});
