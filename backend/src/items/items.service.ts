import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Model } from 'mongoose';
import { Item } from './interface/items.interface';

@Injectable()
export class ItemsService {
  constructor(
    @Inject('ITEM_MODEL') private itemModel: Model<Item>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const item = await this.itemModel.create(createItemDto);
    return {
      message: 'Item created successfully',
      data: item,
    };
  }

  async findAll() {
    const items = await this.itemModel.find().populate('category').exec();
    return {
      message: 'Get All Items successfully',
      length: items.length,
      data: items,
    };
  }

  async findOne(id: string) {
    const item = await this.itemModel.findById(id).populate('category').exec();
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return {
      message: `Get Item with id ${id} successfully`,
      data: item,
    };
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    const item = await this.itemModel.findByIdAndUpdate(
      id,
      { $set: updateItemDto },
      { new: true },
    );
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return {
      message: `Update Item with id ${id} successfully`,
      data: item,
    };
  }

  async remove(id: string) {
    const item = await this.itemModel.findByIdAndDelete(id);
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return {
      message: `Remove Item with id ${id} successfully`,
      data: item,
    };
  }
}
