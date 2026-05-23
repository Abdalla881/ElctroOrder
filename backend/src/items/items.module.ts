import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { DatabaseModule } from 'src/DataBase/database.module';
import { ItemProviders } from './items.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ItemsController],
  providers: [...ItemProviders, ItemsService],
  exports: [ItemsService],
})
export class ItemsModule {}
