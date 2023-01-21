import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Response,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PagseguroService } from 'src/pagseguro/pagseguro.service';
import { KafkaService } from 'src/kafka/kafka.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly pagseguroService: PagseguroService,
    private readonly kafkaService: KafkaService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Request() req,
    @Response() res,
  ) {
    const newOrder = await this.ordersService.create(
      req.user.id,
      createOrderDto,
    );

    const checkoutUrl = await this.pagseguroService.generateCheckout(newOrder);

    await this.kafkaService.sendEmail({
      Username: req.user.name,
      destination: [newOrder.customer.email],
      message: `recebemos seu pedido. Por favor, efetue o pagamento: <a href="${checkoutUrl}">Clique aqui para pagar`,
      subject: `Pedido #${newOrder.id} recebido`,
    });

    return res.redirect(checkoutUrl);
  }
}
