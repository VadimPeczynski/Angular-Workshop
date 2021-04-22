import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  selectedLanguage = 'pl';
  constructor(private translate: TranslateService) {}

  changeLanguage(language: string): void {
    this.translate.use(language);
    this.selectedLanguage = language;
  }
}
