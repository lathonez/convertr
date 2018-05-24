import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ConfigService } from './shared/config.service';
import { AdvertisersModule } from './advertisers/advertisers.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

    // vendor modules
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,

    // convertr modules
    AdvertisersModule,
    SharedModule,
    AppRoutingModule, // router needs to go last
  ],
  providers: [
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
