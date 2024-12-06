import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartProduct } from 'src/app/models/cartProduct';
import { Product } from 'src/app/models/proudct';
import { ProductService } from 'src/app/services/product/product.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  items: Product[] = [];

  constructor(private sharedService:SharedService, 
              private productService:ProductService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllProducts();
    // this.products = [
    //   {id: 1, name: "Mango", description: "this is mango", price: 2.0, quantity: 0, stock:0},
    //   {id: 2, name: "Apple", description: "this is apple", price: 3.0, quantity: 0, stock:0},
    //   {id: 3, name: "Banana", description: "this is banana", price: 1.5, quantity: 0,stock:0},
    // ]
  }

  getAllProducts(){
    this.productService.getProducts().subscribe(data=>{
      this.products = data;
    })
  }

  addToCart(product:any){
    debugger;
    const item = { ...product };
    this.sharedService.addToCart(item);
    this.toastr.success("Item(s) added to the cart!", "Success");
  }

}
