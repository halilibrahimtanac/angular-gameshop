import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../Models/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  path = "http://localhost:3000/game"

  getClickedGame(id:any){
    return this.http.get<Game>(this.path + "/" + id)
  }


  gameList(genre:any){
    let filteredPath = this.path
    if (genre){
      filteredPath = this.path + "?genre=" + genre
    }
    return this.http.get<Game[]>(filteredPath)
  }

  addGameService(game: Game){
    const httpoption={
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'Authorization':'Token'
      })
    }
    return this.http.post<Game>("http://localhost:3000/game",game,httpoption)
  }
  removeGameService(game:Game){
    return this.http.delete("http://localhost:3000/game/" + game.id)
  }
  upDateGameService(id:any,game:Game){
    let newPath = this.path
    newPath = newPath + "/" + id
    return this.http.put<Game>(newPath,game)
  }

}
