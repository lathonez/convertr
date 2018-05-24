import { Location } from '@angular/common';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AdvertisersComponent } from './advertisers.component';
import { routes } from './advertisers-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatTableModule, MatToolbarModule } from '@angular/material';
import {AdvertiserAddresssPipe} from './advertiser-address.pipe';

describe('AdvertisersRoutingModule', () => {
  let testRouter: any = null;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [
        AdvertisersComponent,
        AdvertiserAddresssPipe,
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        SharedModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatCardModule,
        MatTableModule
      ],
      providers: []
    });

    testRouter = TestBed.get(Router);
    testRouter.initialNavigation();
  });

  it('should direct to advertisers', async(inject([Router, Location], (router: Router, location: Location) => {
    return router.navigate(['/advertisers']).then(() => {
      expect(router.config[0].path).toEqual('advertisers');
      expect(router.config[0].component).toEqual(AdvertisersComponent);
      expect(location.path()).toBe('/advertisers');
    });
  })));
});
