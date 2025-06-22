import {Routes} from '@angular/router';
import {ProductList} from './components/product-list/product-list';
import {ProductDetails} from './components/product-details/product-details';
import {CartDetails} from './components/cart-details/cart-details';
import {Payment} from './components/payment/payment';
import {NotFound} from './not-found/not-found';

export const routes: Routes = [
  {path: 'products', component: ProductList},
  {path: 'products/:slug', component: ProductDetails},
  {path: 'cart', component: CartDetails},
  {path: 'payment', component: Payment},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', component: NotFound}
];
