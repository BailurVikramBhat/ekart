import {Component, EventEmitter, OnInit, Output, signal, WritableSignal} from '@angular/core';
import {IProduct, Product} from '../product/product';
import {SProduct} from '../../services/products/product';
import {HttpClient} from '@angular/common/http';
import {RouterLink, RouterModule} from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [Product, RouterModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit{

  products!:IProduct[];
  isLoading:WritableSignal<boolean> = signal<boolean>(true);


  errorMessage:string|null = null;

  constructor(private productService:SProduct) {
  }

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: data => {
        this.products = data;
        this.isLoading.set(false);
      },
      error: err => {
        this.isLoading.set(false);
        this.errorMessage = err.message;
      }
    })
  }

}
