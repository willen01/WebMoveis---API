import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  Body,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
    private readonly authService: AuthService,
  ) {}

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

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('protegida')
  @UseGuards(JwtAuthGuard)
  async teste() {
    return 'rota protegida';
  }
}
