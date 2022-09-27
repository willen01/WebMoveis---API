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

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly pagseguroService: PagseguroService,
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
    return res.redirect(checkoutUrl);
  }
}
