import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { MessageToEmailServiceProtocol } from './protocols/email-service-message';

@Injectable()
export class KafkaService {
  private kafkaProducer: Producer;

  constructor(
    @Inject('KAFKA_CLIENT') private readonly KafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaProducer = await this.KafkaClient.connect();
  }

  async sendEmail(options: MessageToEmailServiceProtocol) {
    await this.kafkaProducer.send({
      topic: process.env.KAFKA_TOPIC,
      messages: [
        {
          value: JSON.stringify(options),
        },
      ],
    });
  }
}
