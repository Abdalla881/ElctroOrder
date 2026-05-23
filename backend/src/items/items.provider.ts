import { Connection } from 'mongoose';
import { ItemSchema } from './schema/item.schema';

export const ItemProviders = [
  {
    provide: 'ITEM_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('item', ItemSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
