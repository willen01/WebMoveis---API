import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Body,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('register')
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const customer = await this.customersService.findOneByEmail(
      createCustomerDto.email,
    );

    if (customer) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Duplicated e-mail.',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    await this.customersService.create(createCustomerDto);
  }
}
