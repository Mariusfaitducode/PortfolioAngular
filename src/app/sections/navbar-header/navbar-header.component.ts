import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar-header',
  standalone: true,
  imports: [
    TranslateModule],
  templateUrl: './navbar-header.component.html',
  styleUrl: './navbar-header.component.scss'
})
export class NavbarHeaderComponent {

  constructor(private translate: TranslateService) { }

  language = 'fr';

  changeLanguage(langauge: string) {
    this.language = langauge;
    this.translate.use(langauge);
  }

}
