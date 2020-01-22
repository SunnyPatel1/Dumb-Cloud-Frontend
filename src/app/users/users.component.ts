import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users = [];
  public software = [];

  public softwareForCurrentUser = [];

  public currentUser : {"name" : string, "id" : number }  = null;

  newUserForm = new FormGroup({
		name: new FormControl(''),
		addr: new FormControl('')
  })
  
  newLicenseForm = new FormGroup({
    softid: new FormControl(''),
    key: new FormControl('')
  })

  constructor(private data: DataService) {
		this.data.getUsers();

    this.data.gotUsers.subscribe( c => this.users = this.data.users);

    this.data.getSoftware();

    this.data.gotSoftware.subscribe( c=> this.software = this.data.software);
    
    console.log(this.users);
	}

  ngOnInit() {
  }

  public onManage(name, id) {
    this.currentUser = {"name" : name, "id" : id};


    this.data.getSoftwareByUsers(id);

    this.data.gotSoftwareByUser.subscribe(c => this.softwareForCurrentUser = this.data.softwareForUser);
  }

  public onAddKey() {
    const json = { "s_id" : this.newLicenseForm.get('softid').value,
      "key" : this.newLicenseForm.get('key').value,
      "u_id" : this.currentUser.id };
    
    this.data.addLicenseToUser(json, this.currentUser.id);
  }

  public onAddUser() {
    const json = this.newUserForm.value;
    console.log(this.newUserForm.value);

    this.data.addUser(json);
  }

  public onDeleteUser(id) {
    console.log(id);
    const json = {"id" : id};
    this.data.deleteUser(json);

  }

  public onDeleteLicense(id) {
    const json = { "s_id" : id, "u_id" : this.currentUser.id };
    
    this.data.deleteLicenseForUser(json);
  }

}
