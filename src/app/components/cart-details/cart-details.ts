import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import { CartService }       from '../../services/cart/cart-service';
import { SProduct }          from '../../services/products/product';
import { IProduct }          from '../product/product';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Modal} from '../modal/modal';
import {catchError, forkJoin, of, switchMap, tap} from 'rxjs';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.html',
  imports: [
    RouterLink,
    RouterOutlet,
    Modal
  ],
  styleUrls: ['./cart-details.css']
})
export class CartDetails implements OnInit {

  cartIds = new Map<string, number>();

  cartProducts: IProduct[] = [];

  placingOrder:WritableSignal<boolean> = signal(false);


  isLoading = true;
  error: string | null = null;

  constructor(
    private cartService: CartService,
    private productService: SProduct
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.cartService.items$
      .pipe(
        // 1) stash the latest ID→qty map
        tap(idsMap => {
          this.cartIds = idsMap;
          this.error = null;
        }),
        // 2) for each new map, build an array of fetch‐observables
        switchMap(idsMap => {
          this.isLoading=false;
          const ids = Array.from(idsMap.keys());
          if (!ids.length) {
            // nothing in cart → emit empty array
            this.isLoading = false;
            return of([] as IProduct[]);
          }
          return forkJoin(
            ids.map(id =>
              this.productService.getProductById(id).pipe(
                // if one fetch fails, swallow it and return `null`

                catchError(() => of(null))
              )
            )
          );

        }),

      )
      .subscribe({
        next: products => {
          // drop any nulls from failures
          this.cartProducts = products.filter((p): p is IProduct => !!p);

          // if map was nonempty but no products loaded, it’s an error
          if (this.cartIds.size && !this.cartProducts.length) {
            this.error = 'Could not load any of your cart items.';
          } else if (!this.cartIds.size) {
            // cart was empty
            this.error = 'Your cart is empty.';
          }
        },
        error: () => {
          this.error = 'Unable to load cart items.';
        }
      });
  }

  addProductQuantity(id: string) {
    this.cartService.addToCart(id);
  }

  deleteProductQuantity(id: string) {
    this.cartService.removeFromCart(id);

  }
}
