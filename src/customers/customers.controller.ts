import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  Body,
  UseGuards,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UpdatePasswordCustomerDto } from './dto/uptade-password-customer.dto';

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

  @Get('orders')
  @UseGuards(JwtAuthGuard)
  async listOrders(@Request() req) {
    const { password, ...customer } =
      await this.customersService.listCustomersOrders(req.user.id);
    return customer;
  }

  @Get('orders/:id')
  @UseGuards(JwtAuthGuard)
  async singleOrders(@Request() req, @Param('id') orderId: string) {
    return this.customersService.listSingleOrderByCustomer(
      req.user.id,
      +orderId,
    );
  }

  @Put('update-profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Request() req,
    @Body() updatecustomerDTO: UpdateCustomerDto,
  ) {
    const { password, ...customer } = await this.customersService.update(
      req.user.id,
      updatecustomerDTO,
    );
    return customer;
  }

  @Put('update-password')
  @UseGuards(JwtAuthGuard)
  async updatePassword(
    @Request() req,
    @Body() updatePasswordCustomerDto: UpdatePasswordCustomerDto,
  ) {
    const { password, confirmPassword } = updatePasswordCustomerDto;
    if (password != confirmPassword) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Incorrect Password confimation',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.customersService.updatePassword(req.user.id, password);
  }
}
