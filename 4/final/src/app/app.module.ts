import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { FormsModule } from '@angular/forms';
import { SecretPipe } from './hero-list/secret.pipe';
import { FistComponent } from './shared/fist/fist.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api/http-client-in-memory-web-api.module';
import { HeroDataService } from './hero-list/hero-data.service';
import { RouterModule } from '@angular/router';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { httpInterceptorProviders } from './interceptors';
import { HeroDetailGuard } from './hero-detail/hero-detail.guard';
import { HeroEditComponent } from './hero-edit/hero-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    FistComponent,
    HeroListComponent,
    HomeComponent,
    NavBarComponent,
    SecretPipe,
    HeroDetailComponent,
    HeroEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(HeroDataService, {
      dataEncapsulation: false,
    }),
    RouterModule.forRoot([
      { path: 'heroesEdit/:id', component: HeroEditComponent },
      { path: 'heroesEdit', component: HeroEditComponent },
      { path: 'heroes', component: HeroListComponent },
      {
        path: 'heroes/:id',
        component: HeroDetailComponent,
        canActivate: [HeroDetailGuard],
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
