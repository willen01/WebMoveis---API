import { Module } from '@nestjs/common';
import { KafkaClient } from './kafka.config';
import { KafkaService } from './kafka.service';

@Module({
  imports: [KafkaClient],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
