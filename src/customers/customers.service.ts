import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
const bcrypt = require('bcrypt');

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  listSingleOrderByCustomer(customerId: number, orderId: number) {
    return this.prisma.order.findFirst({
      where: {
        customer_id: customerId,
        id: orderId,
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  create(createCustomerDto: CreateCustomerDto) {
    return this.prisma.customer.create({
      data: {
        ...createCustomerDto,
        password: this.preparePassword(createCustomerDto.password),
      },
    });
  }

  private preparePassword(plainTextPassword: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainTextPassword, salt);
  }

  comparePassword(plainTextPassword: string, hash: string) {
    return bcrypt.compareSync(plainTextPassword, hash);
  }

  findOneByEmail(email: string) {
    return this.prisma.customer.findFirst({
      where: { email: email },
    });
  }

  listCustomersOrders(customerId: number) {
    return this.prisma.customer.findFirst({
      where: {
        id: customerId,
      },
      include: {
        orders: {
          include: {
            products: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
  }

  update(customerId: number, updateCustomerDTO: UpdateCustomerDto) {
    return this.prisma.customer.update({
      where: {
        id: customerId,
      },
      data: updateCustomerDTO,
    });
  }

  updatePassword(customerId: number, newPlainTextPassword: string) {
    return this.prisma.customer.update({
      where: {
        id: customerId,
      },
      data: {
        password: this.preparePassword(newPlainTextPassword),
      },
    });
  }
}
