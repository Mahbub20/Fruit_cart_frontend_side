import { OrderItemDto } from "./orderItemDto";

export interface OrderDto{
    id: number;
    subTotal: number;
    totalAmount: number;
    createdAt: Date;
    orderItems: OrderItemDto[];
    customerName: string;
    customerEmail: string;
    paymentAmount: number;
    paymentStatus: string;
}