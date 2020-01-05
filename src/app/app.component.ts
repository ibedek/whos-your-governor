import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { EntityDetailRequestModel } from './_models/entity-detail-request.model';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(public translate: TranslateService, private titleService: Title) {
    translate.setDefaultLang(this.selectedLanguage);
    translate.use(this.selectedLanguage);
  }

  public selectedValues: EntityDetailRequestModel;
  public selectedLanguage = this._loadDefaultLanguage();

  ngOnInit() {
    this.translate
      .get('TITLE')
      .subscribe((res: string) => this.titleService.setTitle(res));
  }

  public changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);
    this.translate.use(this.selectedLanguage);
  }

  public onSubmitValues(values) {
    this.selectedValues = values;
  }

  private _loadDefaultLanguage() {
    const lang = localStorage.getItem('selectedLanguage');
    if (lang) {
      return lang;
    }

    return 'en';
  }
}
