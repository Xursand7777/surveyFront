import { Component, inject, signal } from '@angular/core';
import { Constants, Language } from '@core/constants/constants';
import { NzDropDownDirective, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NgClass } from '@angular/common';
import { TranslocoService } from '@ngneat/transloco';
import { BrowserStorage } from '@core/services/browser-storage.service';
@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
  imports: [NzDropdownMenuComponent, NgClass, NzDropDownDirective],
  standalone: true,
})
export class LanguagesComponent {
  private transloco$ = inject(TranslocoService);
  readonly LANGUAGES = Constants.LANGUAGES;
  overlayVisible = false;
  activeLang = signal<Language>(
    Constants.LANGUAGES.find((el) => el.code === BrowserStorage.currentLanguage) ||
      Constants.DEFAULT_LANGUAGE,
  );

  changeLang(language: Language) {
    this.activeLang.set(language);
    this.overlayVisible = false;
    BrowserStorage.currentLanguage = language.code;
    this.transloco$.setActiveLang(language.code);
  }
}
