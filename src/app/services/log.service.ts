import { Injectable }       from '@angular/core';
import {BehaviorSubject}    from 'rxjs';
import {Observable}         from 'rxjs';
import {of}                 from 'rxjs';
import { fromEventPattern } from 'rxjs';
import {Log}                from '../modules/Log';


@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({id: '', text: '', date: ''});
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() { 
    // this.logs = [
    //   {id: '1', text: 'Generated components', date: new Date ('12/26/2017 12:54:23')},
    //   {id: '2', text: 'Added Bootstrap',      date: new Date ('12/26/2017 13:54:23')},
    //   {id: '3', text: 'Added logs component', date: new Date ('12/26/2017 14:54:23')}
    // ]
    this.logs=[];
  }

  getLogs(): Observable<Log[]> {
    if(localStorage.getItem('logs') === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs')!);
    }
    return of(this.logs.sort((a, b) => {return b.date - a.date}));
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);
    
    //add to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if(log.id ===cur.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);

    //Update to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if(log.id ===cur.id) {
        this.logs.splice(index, 1);
      }
    });

    //Delete from local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }
}
