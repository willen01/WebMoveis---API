import { Body, Controller, Post } from '@nestjs/common';
import { KafkaService } from 'src/kafka/kafka.service';
import { OrdersService } from 'src/orders/orders.service';
import { PagseguroService } from './pagseguro.service';

@Controller('pagseguro')
export class PagseguroController {
  constructor(
    private readonly pagseguroService: PagseguroService,
    private readonly orderService: OrdersService,
    private readonly kafkaservice: KafkaService,
  ) {}
  @Post('notification')
  async notification(@Body() body) {
    const { notificationCode } = body;
    const info = await this.pagseguroService.fetchTransactionInfo(
      notificationCode,
    );
    await this.orderService.updateOrderStatus(info);
    const order = await this.orderService.findOrderById(+info.orderId);

    await this.kafkaservice.sendEmail({
      Username: order.customer.name,
      destination: [order.customer.email],
      subject: `Pedido #${order.id} atualizado`,
      message: `Atualização  no status do pedido #${order.id}. Novo status: ${info.status}`,
    });
  }
}
