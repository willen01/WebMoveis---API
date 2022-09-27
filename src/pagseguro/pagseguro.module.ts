import { Module } from '@nestjs/common';
import { PagseguroService } from './pagseguro.service';
import { PagseguroController } from './pagseguro.controller';
import { PrismaService } from 'src/prisma.service';
import { OrdersService } from 'src/orders/orders.service';

@Module({
  providers: [PagseguroService, PrismaService, OrdersService],
  controllers: [PagseguroController],
})
export class PagseguroModule {}
