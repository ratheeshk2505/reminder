import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-createnote',
  templateUrl: './createnote.component.html',
  styleUrls: ['./createnote.component.css']
})
export class CreatenoteComponent implements OnInit {

  user:any
  dLogin:Date = new Date()

  createForm=this.fb.group({
    rname:['',[Validators.required]],
    rdescription:['',[Validators.required]],
    rdate:['',[Validators.required]]
  })

  constructor(private route:Router, private ds:DataService, private fb:FormBuilder) {
    this.user = "Hello "+localStorage.getItem('currUser') +","
   }

  ngOnInit(): void {
    if(!localStorage.getItem("token")){
      alert("Access Denied. Please Login")
      this.route.navigateByUrl("")
    }
  }

  logout(){
    localStorage.removeItem("token")
    this.route.navigateByUrl("")
  }

  createnote(){
    var uname = localStorage.getItem("currUname")
    var uId = localStorage.getItem("uId")
    var rname=this.createForm.value.rname
    var rdescription=this.createForm.value.rdescription
    var rdate=this.createForm.value.rdate
    if(this.createForm.valid){
      this.ds.createnote(uname, uId, rname, rdescription, rdate)
      .subscribe((result:any)=>{
        if (result){
          alert(result.message)
        }
      }, (result:any)=>{
        alert(result.error.message)
      })
    }
    else{
      alert("Invalid Form Details")
    }
  }

}
