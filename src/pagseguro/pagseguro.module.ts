import { Module } from '@nestjs/common';
import { PagseguroService } from './pagseguro.service';
import { PagseguroController } from './pagseguro.controller';
import { PrismaService } from 'src/prisma.service';
import { OrdersService } from 'src/orders/orders.service';
import { KafkaModule } from 'src/kafka/kafka.module';
import { ShippingsModule } from 'src/shippings/shippings.module';

@Module({
  imports: [KafkaModule, ShippingsModule],
  providers: [PagseguroService, PrismaService, OrdersService],
  controllers: [PagseguroController],
  exports: [PagseguroService]
})
export class PagseguroModule {}
