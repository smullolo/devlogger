import { Component, OnInit }  from '@angular/core';
import {Log}                  from '../../modules/Log';
import {LogService}           from '../../services/log.service';
@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  id:   string;
  text: string;
  date: any;

  isNew: boolean = true;

  constructor(private logService: LogService) {
    this.id = "";
    this.text= "";
   }

  ngOnInit(): void {
    // Subscribe to the selectedLog oservable
    this.logService.selectedLog.subscribe(log => {
      if(log.id !== '') {
        this.isNew = false;
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
    }
  });
  }

  onSubmit() {
    //Check if new log
    if(this.isNew) {
      const newLog = {
        id: this.generateID(),
        text: this.text,
        date: new Date()

      }
      this.logService.addLog(newLog);
    } else {
      const updLog = {
        id: this.id,
        text: this.text,
        date: new Date()
      }
      this.logService.updateLog(updLog);
    }

    // Clear state
    this.clearState();
  }

  clearState() {
    this.isNew = true;
    this.id = '';
    this.text = '';
    this.date = '';

    this.logService.clearState();

  }

  generateID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
