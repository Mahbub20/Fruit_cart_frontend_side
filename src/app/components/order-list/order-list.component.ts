import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders = [
    {
      orderId: 1,
      createdAt: new Date(),
      totalAmount: 100.5,
      paymentStatus: 'Success',
      orderItems: [
        { productName: 'Mango', quantity: 2, unitPrice: 10 },
        { productName: 'Banana', quantity: 5, unitPrice: 5 }
      ]
    },
    {
      orderId: 2,
      createdAt: new Date(),
      totalAmount: 75,
      paymentStatus: 'Pending',
      orderItems: [
        { productName: 'Apple', quantity: 3, unitPrice: 20 },
        { productName: 'Banana', quantity: 1, unitPrice: 15 }
      ]
    }
  ];

  expandedOrderId: number | null = null;

  toggleExpand(order: any): void {
    this.expandedOrderId =
      this.expandedOrderId === order.orderId ? null : order.orderId;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
