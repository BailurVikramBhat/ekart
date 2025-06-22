import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './header/header';
import {Footer} from './footer/footer';
import {Cart} from './cart/cart';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Cart, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  get brandName() {
    return "Lumen Lair & Supply Co.";
  }

}
