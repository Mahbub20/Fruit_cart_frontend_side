export interface OrderItemDto{
    id: number;
    productId: number;
    name: string;
    quantity: number;
    unitPrice: number; // Price at the time of purchase
    totalPrice: number; // Calculated property
    createdAt: Date;
}