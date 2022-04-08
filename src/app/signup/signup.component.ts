import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../Models/User';
import { AlertifyService } from '../services/alertify.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http: HttpClient, private formBuilder: FormBuilder,private alertifyService:AlertifyService,private userService:UserService) { }

  userAddForm: FormGroup = new FormGroup({
    userName : new FormControl(""),
    email : new FormControl(""),
    password : new FormControl("")
  });
  newUser: User = new User()
  validUser: User = new User()
  allUsers: User[] = []

  createUserAddForm = () => {
    this.userAddForm = this.formBuilder.group({
      userName: ["",Validators.required],
      email: ["",Validators.required],
      password: ["",Validators.required]
    })
  }

  ngOnInit(): void {
    this.createUserAddForm()

    this.http.get<any>("http://localhost:3000/currentUser").subscribe(data=>{
        if(data.isSignedIn == true){
          window.location.href = "http://localhost:4200"
        }
      }  
      )
  }

  add(){
    let lastUserId
    if (this.userAddForm.valid){
      this.newUser = Object.assign({},this.userAddForm.value)
    }
    this.userService.getUser().subscribe(data=>{
      this.allUsers = data
      lastUserId = this.allUsers[Object.keys(this.allUsers).length-1].id
  })
    this.validUser = {
      id : lastUserId,
      userName : this.newUser.userName,
      email : this.newUser.email,
      password : this.newUser.password,
      cart : [],
      library : [],
      purchaseHistory : [],
      isAdmin: false
    }
    this.userService.addUser(this.validUser).subscribe(data=>{
      console.log(data)
      this.alertifyService.success("You successfully signed up!")
    })
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

}
