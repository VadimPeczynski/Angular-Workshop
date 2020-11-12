import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { FormsModule } from '@angular/forms';
import { SecretPipe } from './hero-list/secret.pipe';
import { FistComponent } from './shared/fist/fist.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroListComponent,
    SecretPipe,
    FistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
