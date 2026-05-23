import { Document } from 'mongoose';

export interface Order extends Document {
  readonly userId: string;
  readonly customerName: string;
  readonly items: {
    product: string;
    quantity: number;
  }[];
  readonly total: number;
  readonly address: string;
  readonly phone: string;
  readonly notes?: string;
  readonly paymentMethod: 'cash' | 'card';
  readonly status: 'preparing' | 'onway' | 'delivered';
}
