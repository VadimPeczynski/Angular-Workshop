import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecretPipe } from './hero-list/secret.pipe';
import { FistComponent } from './shared/fist/fist.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { httpInterceptorProviders } from './interceptors';
import { HeroDetailsGuard } from './hero-details/hero-details.guard';
import { HeroEditComponent } from './hero-edit/hero-edit.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    FistComponent,
    HeroListComponent,
    HomeComponent,
    NavBarComponent,
    SecretPipe,
    HeroDetailsComponent,
    HeroEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
  }}
),
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'heroesEdit/:id', component: HeroEditComponent },
      { path: 'heroes', component: HeroListComponent },
      { path: 'heroesEdit', component: HeroEditComponent },
      {
        path: 'heroes/:id',
        component: HeroDetailsComponent,
        canActivate: [HeroDetailsGuard],
      },
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ]),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
