import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../Models/Game';

@Pipe({
  name: 'gameFilter'
})
export class GameFilterPipe implements PipeTransform {

  transform(value: Game[], filterText?:string): Game[] {
    filterText = filterText?filterText.toLocaleLowerCase():""

      return filterText?value.filter((p:Game)=>p.gameName.toLocaleLowerCase().indexOf(filterText)!==-1):value
  }

}
