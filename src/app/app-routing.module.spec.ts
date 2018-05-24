import { Location } from '@angular/common';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { appRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

describe('AppRoutingModule', () => {
  let testRouter: any = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PageNotFoundComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(appRoutes)
      ]
    });

    testRouter = TestBed.get(Router);
    testRouter.initialNavigation();
  });

  it('should redirect "" to "/advertisers"', async(inject([Router, Location], (router: Router, location: Location) => {
    return router.navigate(['/']).then(() => {
      expect(location.path()).toBe('/advertisers');
    });
  })));
});
