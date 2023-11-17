import { Injectable, SecurityContext } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { StorageService } from './storage.service';


import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private storageProvider; 

  constructor(
    private location: Location, 
    private storageService: StorageService,
    private route: ActivatedRoute,
    private sanitizer : DomSanitizer
    ) {this.storageProvider= this.storageService.getLocalStorage(true);}

  parseUrlParams() {

  }

  getSetting(settingName: string) {

  }

  cacheSetting(settingName: string, setting: any) {
    this.storageProvider.setItem(settingName, setting);
  }

  clearQueryString() {
    this.route.queryParams.subscribe({}); 
  }
}
