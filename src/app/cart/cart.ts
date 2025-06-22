import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {CartService} from '../services/cart/cart-service';
import {Observable} from 'rxjs';
import {inject} from '@angular/core/testing';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  cartCount = 0;
  constructor(private cartService:CartService) {
  }
  ngOnInit() {
    this.cartService.count$.subscribe(count => {
      this.cartCount = count;
    });
  }

}
