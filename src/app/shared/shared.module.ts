import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddAdvertiserComponent } from './add-advertiser/add-advertiser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatInputModule, MatFormFieldModule, MatToolbarModule, MatCardModule } from '@angular/material';


@NgModule({
  exports: [
    AddAdvertiserComponent,
    HeaderComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AddAdvertiserComponent,
    HeaderComponent,
    PageNotFoundComponent,
  ]
})
export class SharedModule { }
