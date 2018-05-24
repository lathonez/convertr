// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { instance, mock } from 'ts-mockito';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app/app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from './app/shared/shared.module';
import { ConfigService } from './app/shared/config.service';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatTableModule, MatToolbarModule} from '@angular/material';
import {AdvertisersService} from './app/advertisers/advertisers.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context: any = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);

export class TestUtils {

  public static COMPILER: any = {
    app: 1,
    feature: 2,
  };

  public static beforeEachCompiler(components: Array<any>, compilerMode?: number): Promise<{ fixture: any, instance: any }> {

    const imports: Array<any> = [
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatToolbarModule,
      MatCardModule,
      MatTableModule,
    ];

    switch (compilerMode) {
      case TestUtils.COMPILER.app:
        imports.push(AppRoutingModule);
        imports.push(SharedModule);
        break;
      case TestUtils.COMPILER.feature:
        imports.push(SharedModule);
        break;
    }

    return TestUtils.configureTestingModule(components, imports)
      .compileComponents().then(() => {
        const fixture: any = getTestBed().createComponent(components[0]);
        return {
          fixture: fixture,
          instance: fixture.debugElement.componentInstance,
        };
      });
  }

  public static configureTestingModule(components: Array<any>, imports: Array<any>): typeof TestBed {

    const advertiserService: AdvertisersService = instance(mock(AdvertisersService));
    const config: ConfigService = instance(mock(ConfigService));

    return TestBed.configureTestingModule({
      declarations: [
        ...components,
      ],
      providers: [

        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: ConfigService, useValue: config},
        {provide: Router, useValue: instance(mock(Router))},
        {provide: ActivatedRoute, useValue: instance(mock(ActivatedRoute))},
        {provide: AdvertisersService, useValue: advertiserService},
      ],
      imports: imports
    });
  }
}
