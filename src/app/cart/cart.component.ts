import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Game } from '../Models/Game';
import { User } from '../Models/User';
import { AlertifyService } from '../services/alertify.service';
import { CartService } from '../services/cart.service';
import { GameService } from '../services/game.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  constructor(private http:HttpClient,private userService:UserService,private cartService:CartService,private alertifyService:AlertifyService) { }
  cart = new Array()
  user = new User()
  currentUserId = 0

  

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(data=>{
      if(data.isSignedIn){
        this.userService.getUser().subscribe(veri=>{
          veri.forEach((value)=>{
            if (value.id === data.id){
              this.cart = value.cart
              this.user = value
              this.currentUserId = value.id
            }
          })
        })
      }
      else {
        window.location.href = "http://localhost:4200"
      }
    }
      
    )
    
  }

  removeFromCart(game:any){
    this.cartService.removeCart(this.user,game).subscribe(data=>{
      this.cart = data.cart
    }
      
    )
  }

  buyGameComponent(game:any){
    this.cartService.buyGame(game).subscribe(users=>{
        users.forEach((value)=>{
          if(value.id === this.currentUserId){
            this.cart = value.cart
          }
        })
      
    })
    async function name() {
      let promise = new Promise((resolve,reject)=>{
        setTimeout(()=>{
          window.location.reload()
        },100)
      })
      let response = await promise
      
    }
    name().then(response=> console.log(response))
    
  }

}
