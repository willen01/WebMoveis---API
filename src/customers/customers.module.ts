import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { PagseguroModule } from 'src/pagseguro/pagseguro.module';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [AuthModule, PagseguroModule,KafkaModule],
  controllers: [CustomersController],
  providers: [CustomersService, PrismaService],
})
export class CustomersModule {}
