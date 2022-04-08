import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from "../Models/Game"
import { User } from '../Models/User';
import { AlertifyService } from '../services/alertify.service';
import { CartService } from '../services/cart.service';
import { GameService } from '../services/game.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private gameService: GameService,
    private alertifyService: AlertifyService,
    private userService:UserService,
    private cartService:CartService,
    private activatedRoute:ActivatedRoute) { }
  filterText = ""
  games: Game[] = []
  users : User[] = []
  gameB : Object = {}
  cart = new Array()
  currentUser = new User()
  isSignedIn: boolean = false


  addCart = (game:Game) => {
    if (this.cart.some(e => e.id === game.id)){
      this.cart.forEach((value)=>{
      if (value.id === game.id){
        value.amount+=1
      }
    })
    }
    else {
      this.gameB = {
      id: game.id,
    gameName: game.gameName,
    price: game.price,
    genre: game.genre,
    gamePlatform: game.gamePlatform,
    description: game.description,
    gameImg: game.gameImg,
    amount: 1
    }
    this.cart.push(this.gameB)
    }
    
    
    this.cartService.addToCart(this.currentUser,this.cart).subscribe(data=>(
      console.log(data)
    ))
    this.alertifyService.success(game.gameName + " added to cart!")
  }
  removeGame(game:Game){
    this.gameService.removeGameService(game).subscribe(data=>{
      console.log(data)
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

  ngOnInit(): void {
    this.userService.getUser().subscribe(data=>{
      this.users = data
    })
    this.activatedRoute.params.subscribe(params=>{
      this.gameService.gameList(params["genre"]).subscribe(data=>(
      this.games = data
    ))
    })
    
    this.http.get<any>("http://localhost:3000/currentUser").subscribe(data=>{
      this.isSignedIn = data.isSignedIn
      this.userService.getUser().subscribe(dataU=>{
        dataU.forEach((value)=>{
          if (data.id === value.id){
            this.cart = value.cart
            this.currentUser = value
          }
        })
      })
    }
      
    )
    
  }

}
