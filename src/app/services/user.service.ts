import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  path = "http://localhost:3000/user"
  
  getCurrentUser(){
    return this.http.get<any>("http://localhost:3000/currentUser")
  }

  getUser(){
    return this.http.get<User[]>(this.path)
  }

  addUser(user:User){
    const httpoption={
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'Authorization':'Token'
      })
    }
    return this.http.post<User>(this.path,user,httpoption)
  }
  
}
