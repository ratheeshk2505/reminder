import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-viewnotes',
  templateUrl: './viewnotes.component.html',
  styleUrls: ['./viewnotes.component.css']
})
export class ViewnotesComponent implements OnInit {

  user:any
  dLogin:Date = new Date()
  allnotes:any
  Msg:any
  eId:any
  uId = localStorage.getItem("uId")
  updateNote:any


  rNameChange =""
  rdescriptionChange=""
  rdateChange=""

  

  constructor(private route:Router, private ds:DataService, private fb:FormBuilder) {
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
    this.ds.showNotes(this.uId)
    .subscribe((result:any)=>{
      this.allnotes = result.note
      if(result.note.length==0){
        this.Msg=result.messageNo
      }
      else{
        this.Msg=result.messageYes
      }
      
    },((result)=>{
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
    this.eId = event.target.value
    this.ds.deleteN(this.uId,this.eId)
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
