import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  language: string = 'pl';
  constructor(private translate: TranslateService) {}

  onLanguageChange(): void {
    this.translate.use(this.language);
  }
}
