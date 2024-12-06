import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems = JSON.parse(localStorage.getItem('cart') || "[]");

  constructor(private sharedService: SharedService,
              private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  updateQuantity(index:any, quantity:any){
    this.cartItems[index].quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.sharedService.loadCartFromStorage();
  }

  removeItem(index:any){
    this.cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.sharedService.loadCartFromStorage();
    this.toastr.warning("Selected item is removed","Removed");
  }

  getTotalAmount(){
    const totalAmount = this.cartItems.reduce((sum:any, item:any)=> sum+(item.price*item.quantity), 0);
    return totalAmount;
  }

}
