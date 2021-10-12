import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm=this.fb.group({
    pname:['',[Validators.required, Validators.pattern('[a-zA-Z]*')]],
    uname:['',[Validators.required, Validators.pattern('[a-zA-Z]*')]],
    pwrd:['',[Validators.required, Validators.pattern('[a-zA-Z0-9@]*')]]
  })

  constructor(private route:Router, private ds:DataService, private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  register(){
    var pname=this.registerForm.value.pname
    var uname=this.registerForm.value.uname
    var pwrd=this.registerForm.value.pwrd
    if(this.registerForm.valid){
      this.ds.register(pname, uname, pwrd)
      .subscribe((result:any)=>{
        if (result){
          alert(result.message)
          this.route.navigateByUrl("")
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
