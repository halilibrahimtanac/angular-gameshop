import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../Models/Game';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-update-game',
  templateUrl: './update-game.component.html',
  styleUrls: ['./update-game.component.css']
})
export class UpdateGameComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private activatedRoute: ActivatedRoute,private gameService: GameService,private http:HttpClient) { }
  current: any
  clickedGame = new Game()
  platforms: any
  categories: any
  updateGameForm = new FormGroup({
    gameName: new FormControl(""),
    genre: new FormControl(""),
    price: new FormControl(""),
    gamePlatform: new FormControl(""),
    description: new FormControl(""),
    gameImg: new FormControl("")
  }
  )
  createUpdateGameForm(){
    this.updateGameForm = this.formBuilder.group({
      gameName: ["",Validators.required],
      genre: ["",Validators.required],
      price:["",Validators.required],
      gamePlatform: ["",Validators.required],
      description: ["",Validators.required],
      gameImg: ["",Validators.required]
    })
  }
  updateGame(){
    this.gameService.upDateGameService(this.activatedRoute.snapshot.params.id,this.updateGameForm.value).subscribe(data=>{
      console.log(data.gameName + " updated!")
    })
  }

  ngOnInit(): void {
    this.createUpdateGameForm()
    this.http.get("http://localhost:3000/currentUser").subscribe(data=>{
      this.current = data
      if(this.current.isSignedIn && this.current.isAdmin){
        console.log("success")
      }
      else {
        window.location.href = "http:/localhost:4200"
      }
    })
    this.http.get("http://localhost:3000/platform").subscribe(value=>{
      this.platforms = value
    })
    this.http.get("http://localhost:3000/category").subscribe(value=>{
      this.categories = value
    })
    this.gameService.getClickedGame(this.activatedRoute.snapshot.params.id).subscribe(data=>{
      this.updateGameForm = new FormGroup({
        gameName: new FormControl(data["gameName"]),
        genre: new FormControl(data["genre"]),
        price: new FormControl(data["price"]),
        gamePlatform: new FormControl(data["gamePlatform"]),
        description: new FormControl(data["description"]),
        gameImg: new FormControl(data["gameImg"])
      })
    })
    
  }

}
