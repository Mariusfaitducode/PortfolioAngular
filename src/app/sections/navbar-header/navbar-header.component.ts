import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar-header',
  standalone: true,
  imports: [
    TranslateModule, RouterModule],
  templateUrl: './navbar-header.component.html',
  styleUrl: './navbar-header.component.scss'
})
export class NavbarHeaderComponent {

  constructor(private translate: TranslateService, private router: Router ) { }

  language = this.translate.currentLang;

  openMenu = false;

  hideTopMenu = false;

  lastScrollPosition = 0;



  ngOnInit(): void {

    window.addEventListener("scroll", () => { 

      var currentScrollPosition = window.scrollY;
        if (currentScrollPosition > this.lastScrollPosition) {
            // header.style.top = "-90px"; // Masquer le menu
            this.hideTopMenu = true;
            // console.log("hide");
        }
        else {
            this.hideTopMenu = false;
            // console.log("show");
        }
        this.lastScrollPosition = currentScrollPosition;
     });
    function hideMenu() {
        
    }
  }

  changeLanguage(langauge: string) {
    this.language = langauge;
    this.translate.use(langauge);
  }

  openSideMenu(){
    this.openMenu = true;
  }

  navigateAndClose(event : Event, target: string){
    event.preventDefault();
    this.openMenu = false;

    window.location.hash = target;
  }

}
