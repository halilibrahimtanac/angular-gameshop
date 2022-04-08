import { HttpClientModule,HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { User } from '../Models/User';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private appComponent: AppComponent,private http:HttpClient,private router:Router) { }
  username : String = ""
  password : String = ""
  users : User[] = []
  body : any = {}
  isPassword: boolean = true

  verify = () => {
    this.users.forEach((value) => {
      if (value.userName == this.username && value.password == this.password){
         this.body = { 
          id: value.id, 
          userName: value.userName, 
          email: value.email, 
          password: value.password, 
          cart: value.cart, 
          library: value.library, 
          purchaseHistory: value.purchaseHistory,
          isSignedIn: true,
          isAdmin: value.isAdmin}
          this.isPassword = true
        this.http.put<any>("http://localhost:3000/currentUser",this.body).subscribe(data => console.log(data))

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
    })
    if (this.isPassword){
      console.log("success")
    }
    else {
      this.isPassword = false
    }
    
  }

  ngOnInit(): void {
      this.http.get<User[]>("http://localhost:3000/user").subscribe(data=>{
        this.users = data
      })
      this.http.get<any>("http://localhost:3000/currentUser").subscribe(data=>{
        if(data.isSignedIn == true){
          window.location.href = "http://localhost:4200"
        }
      }  
      )
  }

}

