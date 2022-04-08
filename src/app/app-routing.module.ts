import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGameComponent } from './add-game/add-game.component';
import { CartComponent } from './cart/cart.component';
import { GameComponent } from './game/game.component';
import { LibraryComponent } from './library/library.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UpdateGameComponent } from './update-game/update-game.component';

const routes: Routes = [
  {path:'game',component:GameComponent},
  {path:'',redirectTo:'game',pathMatch:'full'},
  {path:'game/:genre',component:GameComponent},
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'cart',component:CartComponent},
  {path:'library',component:LibraryComponent},
  {path:'purchaseHistory',component:PurchaseHistoryComponent},
  {path:'addGame',component:AddGameComponent},
  {path:'update/:id',component:UpdateGameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
