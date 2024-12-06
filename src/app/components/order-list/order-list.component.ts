import { Component, OnInit } from '@angular/core';
import { OrderDto } from 'src/app/models/orderDto';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: OrderDto[] = [];

  expandedOrderId: number | null = null;

  toggleExpand(orderId: number) {
    // Toggle the clicked row
    this.expandedOrderId = this.expandedOrderId === orderId ? null : orderId;
  }

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.orderService.getOrders().subscribe(data=>{
      this.orders = data;
    })
  }

}
