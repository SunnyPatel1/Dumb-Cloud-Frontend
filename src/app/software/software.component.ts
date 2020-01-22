import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css']
})
export class SoftwareComponent implements OnInit {

  public software = [];
  public users = [];

  public usersForCurrentSoftware = [];

  public current : {"id" : number, "name" : string } = null;

  addSoftwareForm = new FormGroup({
		name: new FormControl(''),
	})

  constructor(private data: DataService) {
		this.data.getSoftware();

    this.data.gotSoftware.subscribe( c => this.software = this.data.software);

    this.data.getUsers();
    this.data.gotUsers.subscribe( c=> this.users = this.data.users);
    
	}

  ngOnInit() {
  }
  
  public onManage(id : number, name : string ) {
    this.current = {"id" : id, "name" : name };
    this.data.getUsersBySoftware(id);

    this.data.gotUsersBySoftware.subscribe(c => this.usersForCurrentSoftware = this.data.usersForSoftware);

  }

  public onAddSoftware() {
    console.log('hai');
    const json = {"name": this.addSoftwareForm.get('name').value};
    this.data.addSoftware(json);
  }

  public onRevoke(id) {
    const json = {"u_id" : id, "s_id" : this.current.id};
    this.data.deleteLicenseForSoftware(json);
  }

}
