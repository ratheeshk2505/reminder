import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {

  user:any
  dLogin:Date = new Date()
  Msg:any
  todayNotes:any
  updateNote:any
  uId = localStorage.getItem("uId")
  eId:any

  rNameChange =""
  rdescriptionChange=""
  rdateChange=""

  constructor(private route:Router, private ds:DataService, private fb:FormBuilder, private datePipe: DatePipe) {
    this.user = "Hello "+localStorage.getItem('currUser') +","
    this.populate()
    
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

  populate(){
    var tDateLong = new Date()
    var tDate = this.datePipe.transform(tDateLong, 'yyyy-MM-dd')
    this.ds.todayNote(this.uId, tDate)
    .subscribe((result:any)=>{
      this.todayNotes = result.note
      this.Msg=result.message
    },((result:any)=>{
      this.Msg=result.error.message
    }))
  }

  updateN(event:any){
    this.eId = event.target.value
    this.ds.updateN(this.uId,this.eId)
        .subscribe((result:any)=>{
          if(result){
            this.updateNote = result.note
            this.rNameChange = result.note.rheading
            this.rdescriptionChange = result.note.rdesc
            this.rdateChange = result.note.rdate
          }
        }, (result:any)=>{
            alert(result.error.message)
          }
        )
  }

  deleteN(event:any){
    alert("Are You Sure Want To Delete..?")
    var eId = event.target.value
    this.eId= event.target.value
    this.ds.deleteN(this.uId,eId)
        .subscribe((result:any)=>{
          if(result){
            this.populate()
            alert(result.message)
            
          }
        }, (result:any)=>{
            alert(result.error.message)
          }
        )
    
  }

  rnameChange(event:any){
    this.rNameChange = event.target.value
  }
  rdescChange(event:any){
    this.rdescriptionChange = event.target.value
  }
  rDChange(event:any){
    if(event){
      this.rdateChange = event.target.value
    }
  }

  saveN(){
    var rname=this.rNameChange
    var rdescription=this.rdescriptionChange
    var rdate=this.rdateChange
    this.ds.saveN(this.uId, this.eId, rname, rdescription, rdate)
        .subscribe((result:any)=>{
          if(result){
            alert(result.message)
            this.updateNote=""
            this.populate()            
          }
        }, (result:any)=>{
            alert(result.error.message)
          }
        )
  }

  cancelN(){
    this.updateNote=""
  }


}
