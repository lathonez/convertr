import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdvertisersComponent } from './advertisers.component';

export const routes: Routes = [
  { path: 'advertisers',  component: AdvertisersComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AdvertisersRoutingModule { }
