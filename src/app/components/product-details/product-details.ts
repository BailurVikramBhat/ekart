import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {IProduct} from '../product/product';
import {ActivatedRoute} from '@angular/router';
import {SProduct} from '../../services/products/product';
import {finalize, switchMap} from 'rxjs';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {

  product?: IProduct;
  slug: string | null = null;
  error: string | null = null;
  isLoading: WritableSignal<boolean> = signal<boolean>(true);

  constructor(
    private route: ActivatedRoute,
    private productService: SProduct
  ) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(switchMap(params => {
      this.slug = params.get('slug');
      return this.productService.getItemBySlug(this.slug!);

    })).subscribe({
      next: product => {
        if (product) {
          this.product = product;
        } else {
          this.error = "Product not found";
        }
        this.isLoading.set(false);
      },
      error: error => {
        this.error = 'Unable to load product. Please try again later.';
        this.isLoading.set(false);
      }
    });
  }


}
