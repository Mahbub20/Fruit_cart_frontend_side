import { OrderItemDto } from "./orderItemDto";

export interface OrderRequestDto {
    id: number;
    userName: string;
    userEmail: string;
    orderItems: OrderItemDto[]; // OrderItem should be defined as a separate interface
    subTotal: number;
    totalAmount: number;
    paymentAmount: number;
  }