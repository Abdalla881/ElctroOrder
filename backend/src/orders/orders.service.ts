import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Order } from './interface/orders.interface';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_MODEL') private orderModel: Model<Order>,
  ) {}

  async create(userId: string, createOrderDto: CreateOrderDto) {
    const order = await this.orderModel.create({
      ...createOrderDto,
      userId,
    });
    return {
      message: 'Order created successfully',
      data: order,
    };
  }

  async findAll(userId?: string) {
    const filter = userId ? { userId } : {};
    const orders = await this.orderModel
      .find(filter)
      .populate('items.product')
      .exec();
    return {
      message: 'Get All Orders successfully',
      length: orders.length,
      data: orders,
    };
  }

  async findOne(id: string) {
    const order = await this.orderModel
      .findById(id)
      .populate('items.product')
      .exec();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return {
      message: `Get Order with id ${id} successfully`,
      data: order,
    };
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderModel.findByIdAndUpdate(
      id,
      { $set: updateOrderDto },
      { new: true },
    );
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return {
      message: `Update Order with id ${id} successfully`,
      data: order,
    };
  }

  async remove(id: string) {
    const order = await this.orderModel.findByIdAndDelete(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return {
      message: `Remove Order with id ${id} successfully`,
      data: order,
    };
  }
}
