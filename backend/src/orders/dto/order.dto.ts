import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

class OrderItemDto {
  @IsString()
  @IsNotEmpty()
  product: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsArray()
  @IsNotEmpty()
  items: OrderItemDto[];

  @IsNumber()
  @Min(0)
  total: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsEnum(['cash', 'card'])
  @IsOptional()
  paymentMethod?: 'cash' | 'card';
}

export class UpdateOrderDto {
  @IsEnum(['preparing', 'onway', 'delivered'])
  @IsOptional()
  status?: 'preparing' | 'onway' | 'delivered';
}
