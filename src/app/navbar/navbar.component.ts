import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SigninComponent } from '../signin/signin.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers:[SigninComponent]
})
export class NavbarComponent implements OnInit {

  constructor(private http: HttpClient) { }
  username: String = ""
  isSigned : boolean = false
  isAdmin: boolean = false

  signOut = () => {
    const body = { isSignedIn: false}
    this.http.put<any>("http://localhost:3000/currentUser",body).subscribe(data=>console.log(data))
    this.username = ""
    async function name() {
      let promise = new Promise((resolve,reject)=>{
        setTimeout(()=>{
          window.location.href = "http://localhost:4200"
        },100)
      })
      let response = await promise
      
    }
    name().then(response=> console.log(response))
      
  }
  
  

  ngOnInit(): void {
    this.http.get<any>("http://localhost:3000/currentUser").subscribe(data=>{
      this.username = data.userName
      this.isSigned = data.isSignedIn
      if(data.isAdmin){
        this.isAdmin = true
      }
    }
      
    )
  }

}
