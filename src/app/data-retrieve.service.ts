import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataRetrieveService {

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get('http://ec2-18-225-5-90.us-east-2.compute.amazonaws.com:3000/api/people');
  }

  getSoftware() {
    return this.http.get('http://ec2-18-225-5-90.us-east-2.compute.amazonaws.com:3000/api/software');
  }

  getUsersBySoftware(id) {
    return this.http.get('http://ec2-18-225-5-90.us-east-2.compute.amazonaws.com:3000/api/licenses/bysoftware/' + id);
  }

  getSoftwareByUser(id) {
    return this.http.get('http://ec2-18-225-5-90.us-east-2.compute.amazonaws.com:3000/api/licenses/byuser/' + id);
  }

  addLicense(json) {
    return this.http.post('http://ec2-18-225-5-90.us-east-2.compute.amazonaws.com:3000/api/licenses/', json);
  }

  addUser(json) {
    return this.http.post('http://ec2-18-225-5-90.us-east-2.compute.amazonaws.com:3000/api/people', json)
  }

  deleteUser(json) {
    return this.http.request('delete','http://ec2-18-225-5-90.us-east-2.compute.amazonaws.com:3000/api/people', {body:json})
  }

  deleteLicense(json) {
    return this.http.request('delete','http://ec2-18-225-5-90.us-east-2.compute.amazonaws.com:3000/api/licenses/', {body:json})
  }

  addSoftware(json) {
    return this.http.post('http://ec2-18-225-5-90.us-east-2.compute.amazonaws.com:3000/api/software', json);
  }

}
