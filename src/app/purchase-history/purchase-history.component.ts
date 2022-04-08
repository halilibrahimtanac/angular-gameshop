import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {

  constructor(private userService:UserService) { }
  library = new Array()

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(current=>{
      this.userService.getUser().subscribe(users=>{
        users.forEach((value)=>{
          if(value.id === current.id){
            this.library = value.purchaseHistory
          }
        })
      })
    })
  }

}
