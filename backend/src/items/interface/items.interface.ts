import { Document } from 'mongoose';

export interface Item extends Document {
  readonly name: string;
  readonly nameAr?: string;
  readonly description: string;
  readonly descriptionAr?: string;
  readonly price: number;
  readonly image: {
    public_id: string;
    url: string;
  };
  readonly category: string;
  readonly rating: number;
  readonly popular: boolean;
}
