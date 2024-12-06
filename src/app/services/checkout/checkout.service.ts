import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderRequestDto } from 'src/app/models/orderReqestdto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  checkout(orderReq: OrderRequestDto){
    return this.http.post<any>(`${this.baseUrl}/Checkout/process_order`,orderReq);
  }

}
