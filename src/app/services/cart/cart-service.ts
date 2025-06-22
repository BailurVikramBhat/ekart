import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {
  }

  private items$$ = new BehaviorSubject<Map<string, number>>(new Map());
  // private items$$ = new BehaviorSubject<string[]>([]);
  readonly items$ = this.items$$.asObservable();
  readonly count$: Observable<number> = this.items$.pipe(
    map(items => {
      // let total = 0;
      // items.forEach((value, key) => {
      //   total = total + value;
      // });
      // return total;
      return items.size
    }));

  addToCart(id: string):void {
    const updated = new Map(this.items$$.value);
    const current = updated.get(id) ?? 0;
    updated.set(id, current + 1);
    this.items$$.next(updated);
  }

  removeFromCart(id: string) {
    const updated = new Map(this.items$$.value);
    const current = updated.get(id) ?? 0;
    if(current<=0) return;
    if (current > 1) {
      updated.set(id, current - 1);
    } else {
      updated.delete(id);
    }
    this.items$$.next(updated);
  }

  getCount(productId: string): number {
    return this.items$$.value.get(productId) ?? 0;
  }

}
