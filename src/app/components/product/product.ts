import {
  Component,
  computed,
  EventEmitter,
  input,
  InputSignal,
  OnInit,
  Output,
  signal,
  WritableSignal
} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {CartService} from '../../services/cart/cart-service';
import {Subscription} from 'rxjs';

export interface IProduct {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  subcategory?: string;
  slug: string;
  price: number;
  discountPrice?: number;
  currency: string;
  inStock: boolean;
  quantityAvailable: number;
  seller: {
    name: string;
    rating?: number;
    location?: string;
  };
  images: {
    url: string;
    alt?: string;
  }[];
  videoUrl?: string;
  createdAt: string;
  updatedAt: string;

  attributes: Record<string, string | number | boolean | string[]>;

  warranty?: {
    duration: string;
    type: 'Manufacturer' | 'Seller';
  };

  returnPolicy?: {
    days: number;
    type: 'Replacement' | 'Return' | 'No Return';
  };

  shippingInfo?: {
    estimatedDelivery: string;
    charges: number;
    deliveryModes: string[];
    availablePincodes?: string[];
  };

  ratings?: {
    average: number;
    totalCount: number;
  };

  reviews?: {
    userId: string;
    username: string;
    rating: number;
    comment: string;
    verifiedPurchase: boolean;
    createdAt: string;
  }[];

  seo?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };

  tags?: string[];
  visibility?: 'public' | 'private' | 'draft';
  isFeatured?: boolean;
  isTrending?: boolean;
}

@Component({
  selector: 'app-product',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './product.html',
  styleUrl: './product.scss'
})
export class Product implements OnInit {

  product: InputSignal<IProduct> = input.required();

  quantity: number = 0;
  private sub!: Subscription;

  constructor(private cart: CartService) {
  }

  ngOnInit() {
    this.quantity = this.cart.getCount(this.product().id);
  }


  addToCart() {
    this.cart.addToCart(this.product().id);
    this.quantity = this.cart.getCount(this.product().id);

  }

  deleteFromCart() {
    this.cart.removeFromCart(this.product().id);
    this.quantity = this.cart.getCount(this.product().id);
  }

}
