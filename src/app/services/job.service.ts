/**
 * This sevice contains functions used in scan functionality, where related scan job is created
 * 
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogService } from './log.service';
import {environment} from '../../environments/environment';
import {AppModule} from '../../app/app.module';

@Injectable({
  providedIn: 'root'
})



export class JobService {

  env = environment;


  constructor(private http: HttpClient, private logService: LogService) { }

    registerJob(featureValues: any) {

      try{

      const config = { headers: new HttpHeaders({ "Content-Type": "text/json; charset=utf-8" }) };
  
      const parsedFilename = featureValues.fileName + '.pdf';
  
        var regex = /(\w+)\-?/g;
        var locale = regex.exec(window.navigator.language)[1] || 'en';
        var LocalizedLanguage = encodeURIComponent(locale);

      const job = {
        jobId: featureValues.jobid,
        emailAddress: featureValues.email,
        timeZoneOffsetMinutes: new Date().getTimezoneOffset(),
        filename: parsedFilename,
        localizedLanguage: LocalizedLanguage,
        appId: this.env.appId, 
        deviceId: AppModule.deviceId,
        orientation: featureValues.orientation,
        format: featureValues.fileFormat.toUpperCase(),
        archivalFormat:''
      };
      //this.logService.logTrace('Device Id:' + job.deviceId.toString());
      
      if (featureValues.fileFormat === "pdf") {
        job.archivalFormat = (featureValues.archivalFormat ? 'PDF/A-1b' : 'PDF');
      }
  
      const request = {
        job: job
      };
  
      return this.http.post(this.env.wncAddress+("/api/v1/job"), request, config).toPromise()
        .then((result: any) => {
          this.logService.logTrace('jobService -> registerJob -> success -> result.data:' + result.objToString);
          return result;
        })
        .catch((error: any) => {
          this.logService.logException('jobService -> registerJob -> ERROR...');
          if (error != null && error.data != null && error.data.ExceptionMessage != null) {
            this.logService.logException('jobService -> registerJob -> ERROR:' + error.data.ExceptionMessage.toString);
          }
  
          if (error && error.status == 401) {
            // Need to define $rootScope and $broadcast
           // $rootScope.$broadcast("globalAppMessage", "unauthorized");
          }
        });
      }
      catch(ExceptionMessage)

      {
        this.logService.logException(ExceptionMessage.objToString);
        return  null;
      }

    
    }

    generateNewJobID():string {
      const guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
      });
      return guid;
    }
}
