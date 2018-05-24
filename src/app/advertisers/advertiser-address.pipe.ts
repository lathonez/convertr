import { Pipe, PipeTransform } from '@angular/core';
import { AdvertiserAddress } from '../shared/advertiser.model';

@Pipe({name: 'advertiserAddress'})

export class AdvertiserAddresssPipe implements PipeTransform {

  /**
   * Transform an Advertiser Address into a string for display in the table
   * @param {AdvertiserAddress} address
   * @returns {string}
   */
  public transform(address: AdvertiserAddress): string {
    return `${address.address}<br>${address.postcode}`;
  }
}
