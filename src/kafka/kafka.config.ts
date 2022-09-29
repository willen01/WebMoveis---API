import {
  ClientsModuleOptions,
  Transport,
  ClientsModule,
} from '@nestjs/microservices';

export const KafkaConfig: ClientsModuleOptions = [
  {
    name: 'KAFKA_CLIENT',
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: process.env.KAFKA_BROKER.split(','),
        clientId: process.env.KAFKA_CLIENT_ID,
        ssl: true,
        sasl: {
          mechanism: 'scram-sha-256',
          password: process.env.KAFKA_PASSWORD,
          username: process.env.KAFKA_USERNAME,
        },
      },
    },
  },
];

export const KafkaClient = ClientsModule.register(KafkaConfig);
