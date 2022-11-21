import { Controller, Get, Query } from '@nestjs/common';
import { FindShippingDTO } from './dto/find-shipping.dto';
import { ShippingsService } from './shippings.service';

@Controller('shippings')
export class ShippingsController {
  constructor(private readonly shippingsService: ShippingsService) {}

  @Get()
  async find(@Query() query: FindShippingDTO) {
    const shipping = await this.shippingsService.findShipping(query);

    return {
      type: shipping.shipping[0].name,
      deadline: `${shipping.shipping[0].prazoEntrega} dia(s)`,
      price: shipping.shipping[0].valor,
    };
  }
}
