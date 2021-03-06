import './polyfills';
import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MaterialModule } from './app/material.module';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
