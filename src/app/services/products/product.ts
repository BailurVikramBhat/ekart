import {Injectable} from '@angular/core';
import {IProduct} from '../../components/product/product';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SProduct {

  private url: string = '/products/products.json';

  constructor(private http: HttpClient) {

  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url);
  }

  getItemBySlug(slug: string): Observable<IProduct | undefined> {
    return this.getProducts().pipe(
      map(products => products.find(i => i.slug === slug))
    );
  }


  getProductById(id: string): Observable<IProduct | undefined> {
    return this.getProducts().pipe(
      map(products => products.find(i => i.id === id))
    );

  }
}
