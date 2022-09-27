import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from 'src/orders/orders.service';
import { PagseguroService } from './pagseguro.service';

@Controller('pagseguro')
export class PagseguroController {
  constructor(
    private readonly pagseguroService: PagseguroService,
    private readonly orderService: OrdersService,
  ) {}
  @Post('notification')
  async notification(@Body() body) {
    const { notificationCode } = body;
    const info = await this.pagseguroService.fetchTransactionInfo(
      notificationCode,
    );
    await this.orderService.updateOrderStatus(info);
  }
}
