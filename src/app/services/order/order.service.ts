import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDto } from 'src/app/models/orderDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrders(){
    return this.http.get<OrderDto[]>(`${this.baseUrl}/Order/get_orders`);
  }
}
