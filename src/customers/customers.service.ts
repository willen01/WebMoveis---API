import { Injectable } from '@nestjs/common';
import { PagseguroService } from 'src/pagseguro/pagseguro.service';
import { PrismaService } from 'src/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
const bcrypt = require('bcrypt');

@Injectable()
export class CustomersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pagSeguroService: PagseguroService
  ) { }

  async listSingleOrderByCustomer(customerId: number, orderId: number) {
    const order = await this.prisma.order.findFirst({
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

    //verifica se o pedido ainda está pendente de pagamento e envia a url para pagamento
    if (order.status == "WaitingForPayment") {
      //url de checkout
      const checkoutUrl = await this.pagSeguroService.generateCheckout(order);

      return {
        order,
        urlForPayment: checkoutUrl
      }
    }

    return order
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

  async comparePreviousPassword(customerId: number, previousPassword: string) {
    const customer = await this.prisma.customer.findFirst({
      where: { id: customerId }
    })

    return this.comparePassword(previousPassword, customer.password)
  }

}
