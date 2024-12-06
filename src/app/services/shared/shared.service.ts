import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartProduct } from 'src/app/models/cartProduct';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  private items: any[] = [];

  constructor() { 
    this.loadCartFromStorage();
  }

  addToCart(product: any){
    const existingItem = this.items.find(item => item.id === product.id);

    if (existingItem) {
      // Update the quantity if the item already exists in the cart
      existingItem.quantity += product.quantity;  // Use the existing quantity property from the product
    } else {
      // Add new item to cart
      this.items.push({ ...product });
    }
    this.updateCartCount();
    this.saveCartToStorage();
  }

  updateCartCount(){
    debugger;
    const totalQuantity = this.items.reduce((sum, item)=> sum+item.quantity, 0);
    this.cartCount.next(totalQuantity);
  }

  saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  loadCartFromStorage() {
    debugger;
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
      this.updateCartCount(); // Update the cart count based on loaded items
    }
    else{
      this.items = [];
      this.updateCartCount();
    }
  }

  getCartItems() {
    return this.items;
  }
}
