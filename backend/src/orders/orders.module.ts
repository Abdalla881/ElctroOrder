import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { DatabaseModule } from 'src/DataBase/database.module';
import { OrderProviders } from './orders.provider';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [OrdersController],
  providers: [...OrderProviders, OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
