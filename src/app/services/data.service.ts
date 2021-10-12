import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";

const options={
  withCredential:true,
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private route:Router, private http:HttpClient) { }

  getOptions(){
    const token = localStorage.getItem("token")
    let headers = new HttpHeaders()
    if (token){
      headers = headers.append("x-token",token)
      options.headers = headers
    }
    return options
  }


  login(uname:any, pwrd:any){
    const data = {
      uname, pwrd
    }
    return this.http.post(environment.apiURL+'/login', data, options)
  }

  register(pname:any, uname:any, pwrd:any){
    const data = {
      pname, uname, pwrd
    }
    return this.http.post(environment.apiURL+'/register', data)
  }

  createnote(uname:any, uId:any, rname:any, rdescription:any, rdate:any){
    const data = {
      uname, uId, rname, rdescription, rdate
    }
    return this.http.post(environment.apiURL+'/createnote', data, this.getOptions())
  }

  showNotes(uId:any){
    const data={
      uId
    }
    return this.http.post(environment.apiURL+'/viewnotes', data, this.getOptions())
  }

  todayNote(uId:any, tDate:any){
    const data={
      uId, tDate
    }
    return this.http.post(environment.apiURL+'/todaynote', data, this.getOptions())
  }

  updateN(uId:any, eId:any){
    const data={
      uId, eId
    }
    return this.http.post(environment.apiURL+'/update', data, this.getOptions())
  }

  saveN(uId:any, eId:any, rname:any, rdescription:any, rdate:any){
    const data={
      uId, eId, rname, rdescription, rdate
    }
    return this.http.post(environment.apiURL+'/save', data, this.getOptions())
  }

  deleteN(uId:any, eId:any){
    const data={
      uId, eId
    }
    return this.http.post(environment.apiURL+'/delete', data, this.getOptions())
  }

}
