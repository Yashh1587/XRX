/**
 * This sevice contains functions used to log traces and exception to azure environment
 * 
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
//import { StorageService } from '../services/storage.service';
import {environment} from '../../environments/environment';
import { AppModule } from '../app.module';



@Injectable({
  providedIn: 'root'
})
export class LogService {

  env = environment;


  // Device information property
  public deviceInfo: any = {
    isThirdGenBrowser: AppModule.isThirdGenBrowser,
    generation: AppModule.Generation,
    isVersalink: AppModule.isVersalink,
    isAltalink: AppModule.isAltalink,
    model: AppModule.model,
    deviceId: AppModule.deviceId
  };
  

  constructor(private http: HttpClient)
  { 
  }


  logTrace(message: string | object,logType?: string) {

    if (typeof message === 'object') {
      message = JSON.stringify(message);
    }
   
    const logEntry = { 
      LogMessage: message,
      LogType: LogTypes.Information,
      DeviceInfo: JSON.stringify(this.deviceInfo) 
    };

    const config = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + this.env.apiKey
      })
    };

    this.http.post(`${this.env.wncAppAddress}/v1/api/log/trace`, logEntry, config)
    .pipe(
    catchError((error) => {
      return throwError('An error occurred.');
    })
  )
  .subscribe((response) => {
  });
  }

  logException(exception: string | object,logType?: string) {

    if (typeof exception === 'object') {
      exception = JSON.stringify(exception);
    }
    const traceProperties  = {deviceInfo: this.deviceInfo};
    const logEntry = { 
      LogMessage: exception,
      LogType: LogTypes.Information,
      DeviceInfo: JSON.stringify(this.deviceInfo) 
    };
    const config = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + this.env.apiKey
      })
    };
    
    this.http.post(`${this.env.wncAppAddress}/v1/api/log/exception`, JSON.stringify(logEntry),config).pipe(
      catchError((error) => {
        return throwError('An error occurred.');
      })
    )
    .subscribe();
  }
  
}

export const LogTypes = {
  Information: 'information',
  Error: 'error',
  Warning: 'warning'
};
