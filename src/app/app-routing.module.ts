import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderListComponent } from './components/order-list/order-list.component';

const routes: Routes = [
  {path:'', redirectTo:'product-list', pathMatch:'full'},
  {path:'product-list', component:ProductListComponent},
  {path:'cart', component:CartComponent},
  {path:'checkout', component:CheckoutComponent},
  {path:'order-list', component:OrderListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
