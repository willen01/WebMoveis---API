import { Module } from '@nestjs/common';
import { PagseguroService } from './pagseguro.service';
import { PagseguroController } from './pagseguro.controller';
import { PrismaService } from 'src/prisma.service';
import { OrdersService } from 'src/orders/orders.service';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  providers: [PagseguroService, PrismaService, OrdersService],
  controllers: [PagseguroController],
})
export class PagseguroModule {}
