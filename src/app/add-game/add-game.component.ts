import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Game } from '../Models/Game';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {
  

  constructor(private formBuilder:FormBuilder,private http:HttpClient,private gameService: GameService) { }
  current: any
  game: Game = new Game()
  platforms : any 
  categories : any
  addGameForm: FormGroup = new FormGroup({
    gameName: new FormControl(""),
    genre: new FormControl(""),
    price: new FormControl(""),
    gamePlatform: new FormControl(""),
    description: new FormControl(""),
    gameImg: new FormControl("")
  }
  )
  createAddGameForm(){
    this.addGameForm = this.formBuilder.group({
      gameName: ["",Validators.required],
      genre: ["",Validators.required],
      price:["",Validators.required],
      gamePlatform: ["",Validators.required],
      description: ["",Validators.required],
      gameImg: ["",Validators.required]
    })
  }
  addGame(){
    if(this.addGameForm.valid){
      this.game = Object.assign({},this.addGameForm.value)
    }
    this.gameService.addGameService(this.game).subscribe(data=>{
      console.log(data)
    })
  }

  ngOnInit(): void {
    this.createAddGameForm()
    this.http.get("http://localhost:3000/platform").subscribe(data=>(
      this.platforms = data
    ))
    this.http.get("http://localhost:3000/category").subscribe(data=>(
      this.categories = data
    ))
    this.http.get("http://localhost:3000/currentUser").subscribe(data=>{
      this.current = data
      if(this.current.isSignedIn && this.current.isAdmin){
        console.log("success")
      }
      else {
        window.location.href = "http:/localhost:4200"
      }
    })
  }

}
