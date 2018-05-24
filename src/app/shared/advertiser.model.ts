export interface Advertiser {
  id: number;
  name: string;
  orgurl: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  updatedTs: string;
  address: string;
  addressResolved: AdvertiserAddress;
}

export interface AdvertiserAddress {
    address: string;
    city: string;
    postcode: string;

}
