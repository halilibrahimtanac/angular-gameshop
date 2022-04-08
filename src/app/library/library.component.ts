import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  constructor(private userService:UserService) { }
  isSignedIn: boolean = false
  user = new User()
  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(data=>{
      this.isSignedIn = data.isSignedIn
      if(this.isSignedIn){
        this.userService.getUser().subscribe(users=>{
          users.forEach((value)=>{
            if (value.id === data.id){
              this.user = value
            }
          })
        })
      }
      else {
        window.location.href = "http://localhost:4200"
      }
    })
  }

}
