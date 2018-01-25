import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MatNativeDateModule,} from '@angular/material';
import {HttpModule} from "@angular/http";
import {MaterialModule} from './material.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],

  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [],
})

export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
