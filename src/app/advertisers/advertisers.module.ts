import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisersComponent } from './advertisers.component';
import { AdvertisersRoutingModule } from './advertisers-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdvertisersService } from './advertisers.service';
import { ApiService } from '../shared/api.service';
import {MatCardModule, MatTableModule} from '@angular/material';
import {AdvertiserAddresssPipe} from './advertiser-address.pipe';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    MatTableModule,
    AdvertisersRoutingModule
  ],
  declarations: [
    AdvertisersComponent,
    AdvertiserAddresssPipe,
  ],
  providers: [
    AdvertisersService,
    ApiService
  ]
})
export class AdvertisersModule { }
