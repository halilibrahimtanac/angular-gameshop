import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { AlertifyService } from './alertify.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient,private userService:UserService,private alertifyService:AlertifyService) { }
  isAdmin: boolean = false

  buyGame(game:any){
    this.http.get<any>("http://localhost:3000/currentUser").subscribe(data=>{
      this.http.get<User[]>("http://localhost:3000/user").subscribe(users=>{
        users.forEach((value)=>{
          if (value.id === data.id){
            this.isAdmin = value.isAdmin
            if(value.library.some((v: { id: any; }) => v.id === game.id)){

              value.library.find((e: { id: any; }) => e.id === game.id).amount = game.amount + value.library.find((e: { id: any; }) => e.id === game.id).amount
              
              var today = new Date()
              var hh = String(today.getHours())
              var minute = String(today.getMinutes())
              var dd = String(today.getDate()).padStart(2, '0')
              var mm = String(today.getMonth() + 1).padStart(2, '0')
              var yyyy = today.getFullYear()
    
              let date = "[" +  dd + '/' + mm + '/' + yyyy + "]-----[" + hh + ":" + minute + "]";

              value.purchaseHistory.push({
                id: game.id,
                gameName: game.gameName,
                price: game.price,
                amount : game.amount,
                purchaseDate : date
              })
            }
            else {

              var today = new Date()
              var hh = String(today.getHours())
              var minute = String(today.getMinutes())
              var dd = String(today.getDate()).padStart(2, '0')
              var mm = String(today.getMonth() + 1).padStart(2, '0')
              var yyyy = today.getFullYear()
    
              let date = "[" +  dd + '/' + mm + '/' + yyyy + "]-----[" + hh + ":" + minute + "]";

              value.purchaseHistory.push({
                id: game.id,
                gameName: game.gameName,
                price: game.price,
                amount : game.amount,
                purchaseDate : date
              })

            value.library.push(game)
               
            }
            let index = value.cart.findIndex((y: { id: any; })=>y.id === game.id)
            value.cart.splice(index,1)
            
            this.http.put<User>("http://localhost:3000/user/" + value.id,{
                id: value.id, 
                userName: value.userName, 
                email: value.email, 
                password: value.password, 
                cart: value.cart, 
                library: value.library,
                purchaseHistory: value.purchaseHistory,
                isAdmin: this.isAdmin
          }).subscribe(data=>{
            console.log(data.isAdmin)
          })
          }
        })
        
      })
    })
    return this.http.get<User[]>("http://localhost:3000/user")
  }
  addToCart(user:User,cart:any){

    return this.http.put<User>("http://localhost:3000/user/" + user.id,{
          id: user.id, 
          userName: user.userName, 
          email: user.email, 
          password: user.password, 
          cart: cart, 
          library: user.library,
          purchaseHistory: user.purchaseHistory,
          isAdmin:user.isAdmin
    })
  }
  removeCart(user:User,game:any){
    let index = user.cart.findIndex((y: { id: any; })=>y.id === game.id)
    user.cart.splice(index,1)
    return this.http.put<User>("http://localhost:3000/user/" + user.id,user)
  }

  
}
