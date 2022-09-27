import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/prisma.service';
import { PagseguroService } from 'src/pagseguro/pagseguro.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, PagseguroService],
})
export class OrdersModule {}
