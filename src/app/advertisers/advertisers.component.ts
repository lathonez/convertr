import { Component, OnInit } from '@angular/core';
import { Logger } from '../shared/logger';
import { AdvertisersService } from './advertisers.service';
import { AdvertisersDatasource } from './advertisers.datasource';
import { Advertiser } from '../shared/advertiser.model';

@Component({
  templateUrl: './advertisers.component.html',
  styleUrls: ['./advertisers.component.scss']
})
export class AdvertisersComponent implements OnInit {

  private advertisersService: AdvertisersService;
  private dataSource: AdvertisersDatasource;
  public displayedColumns: Array<string> = ['name', 'orgurl', 'telephone', 'address'];

  /**
   * Component displays a form to create a new advertiser along with a table containing current advertisers
   *
   * @param {AdvertisersService} advertisersService
   */
  constructor(advertisersService: AdvertisersService) {
    this.advertisersService = advertisersService;
  }

  /**
   * When the pages lodas:
   *   - trigger the fetch of advertisers
   *   - create the datasource against the observatory from the AdvertisersService
   */
  public ngOnInit(): void {
    Logger.log('AdvertisersComponent', this, Logger.DEBUG);
    this.advertisersService.fetchAdvertisers().subscribe();
    this.dataSource = new AdvertisersDatasource(this.advertisersService);
  }

  /**
   * Submit a new advertiser to the API
   *
   * @param advertiser
   */
  public doSubmit(advertise4r: any): void {
    this.advertisersService.add(this.wrangleAddress(advertiser))
      .subscribe();
  }

  //
  // Private Functions
  //

  /**
   * The form from AddAdvertiserComponent doesn't structure the address according to our model
   *
   * This is a helper function to manipulate it to advertiser.addressResolved
   *
   * @param advertiser
   * @returns {Advertiser}
   */
  public wrangleAddress(advertiser: any): Advertiser {
    advertiser.addressResolved = {
      address: advertiser.address,
      city: advertiser.city,
      postcode: advertiser.postcode
    };
    delete advertiser.address;
    delete advertiser.city;
    delete advertiser.postcode;

    return advertiser;
  }
}
