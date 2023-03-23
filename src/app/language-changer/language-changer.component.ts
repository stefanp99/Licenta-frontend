import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-language-changer',
  templateUrl: './language-changer.component.html',
  styleUrls: ['./language-changer.component.css']
})
export class LanguageChangerComponent implements OnInit {
  language: string;
  localStorage = window.localStorage;

  ngOnInit(): void {
    this.localStorage.setItem('language', 'ro');
    this.language = 'ro';
  }

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      `icon_ro`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/ro.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `icon_us`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/us.svg")
    );
  }

}
