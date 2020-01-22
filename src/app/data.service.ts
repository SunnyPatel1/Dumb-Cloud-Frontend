import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { DataRetrieveService } from './data-retrieve.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  gotUsers : EventEmitter<any> = new EventEmitter();
  gotSoftware : EventEmitter<any> = new EventEmitter();

  gotSoftwareByUser : EventEmitter<any> = new EventEmitter();
  gotUsersBySoftware : EventEmitter<any> = new EventEmitter();

  users = [];
  software = [];

  softwareForUser = [];
  usersForSoftware = [];

  constructor(private dataGetter : DataRetrieveService) { }

  getUsers() {
    this.dataGetter.getUsers()
    .subscribe( (data: any) => {
      this.users = data;
      console.log(this.users);
      this.gotUsers.emit("done");
    })
  }

  getSoftware() {
    this.dataGetter.getSoftware()
    .subscribe( (data: any) => {
      this.software = data;
      console.log(this.software);
      this.gotSoftware.emit("done");
    })
  }

  getSoftwareByUsers(id) {
    this.dataGetter.getSoftwareByUser(id)
    .subscribe( (data: any) => {
      this.softwareForUser = data;
      console.log(this.softwareForUser);
      this.gotSoftwareByUser.emit("done");
    })
  }

  getUsersBySoftware(id) {
    this.dataGetter.getUsersBySoftware(id)
    .subscribe( (data: any) => {
      this.usersForSoftware = data;
      console.log(this.usersForSoftware);
      this.gotUsersBySoftware.emit("done");
    })
  }

  addLicenseToUser(json, id) {
    this.dataGetter.addLicense(json)
    .subscribe( (data: any) => {
      this.getSoftwareByUsers(json.u_id);
    })
  }

  addLicenseToSoftware(json, id) {
    this.dataGetter.addLicense(json)
    .subscribe( (data: any) => {
      this.getUsersBySoftware(json.s_id);
    })
  }

  addUser(json) {
    this.dataGetter.addUser(json)
    .subscribe( (data: any) => {
      this.getUsers();
    })
  }

  deleteUser(json) {
    console.log(json);
    this.dataGetter.deleteUser(json)
    .subscribe( (data: any) => {
      this.getUsers();
    })
  }

  deleteLicenseForUser(json) {
    this.dataGetter.deleteLicense(json)
    .subscribe( (data: any) => {
      this.getSoftwareByUsers(json.u_id);
    })
  }

  addSoftware(json) {
    this.dataGetter.addSoftware(json)
    .subscribe( (data : any) => {
      this.getSoftware();
    })
  }


  deleteLicenseForSoftware(json) {
    this.dataGetter.deleteLicense(json)
    .subscribe( (data: any) => {
      this.getUsersBySoftware(json.s_id);
    })
  }
}
