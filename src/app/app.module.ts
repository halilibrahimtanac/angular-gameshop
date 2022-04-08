import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule} from '@angular/common/http';
import { SigninComponent } from './signin/signin.component';
import { CategoryComponent } from './category/category.component';
import { GameComponent } from './game/game.component';
import { SignupComponent } from './signup/signup.component';
import { GameFilterPipe } from './game/game-filter.pipe';
import { CartComponent } from './cart/cart.component';
import { LibraryComponent } from './library/library.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { AddGameComponent } from './add-game/add-game.component';
import { UpdateGameComponent } from './update-game/update-game.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SigninComponent,
    CategoryComponent,
    GameComponent,
    SignupComponent,
    GameFilterPipe,
    CartComponent,
    LibraryComponent,
    PurchaseHistoryComponent,
    AddGameComponent,
    UpdateGameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
