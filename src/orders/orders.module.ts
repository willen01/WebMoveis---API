import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/prisma.service';
import { PagseguroService } from 'src/pagseguro/pagseguro.service';
import { KafkaModule } from 'src/kafka/kafka.module';
import { ShippingsModule } from 'src/shippings/shippings.module';
import { ShippingsService } from 'src/shippings/shippings.service';

@Module({
  imports: [KafkaModule, ShippingsModule],
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, PagseguroService ],
})
export class OrdersModule {}
