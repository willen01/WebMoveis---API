import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ShippingsService } from 'src/shippings/shippings.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly shippingService: ShippingsService,
    private readonly prisma: PrismaService,
  ) {}

  findOrderById(orderId: number) {
    return this.prisma.order.findFirst({
      where: {
        id: orderId,
      },
      include: {
        customer: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });
  }

  updateOrderStatus(info) {
    return this.prisma.order.update({
      where: {
        id: +info.orderId,
      },
      data: {
        status: info.status,
      },
    });
  }

  async create(customerId: number, createOrderDto: CreateOrderDto) {
    //DESAFIO - calcula o valor da compra direto no backend
    const productsData = await this.shippingService.findShipping({
      zipcode: createOrderDto.postal_code,
      products: JSON.stringify(createOrderDto.products),
    });

    // DESAFIO - Calcula o valor do frete diretamente no backend
    let shipping = productsData.shipping[0].valor.replace(',', '');
    let total_shipping = Number(shipping);

    return this.prisma.order.create({
      include: {
        customer: {
          select: {
            email: true,
          },
        },
        products: {
          include: {
            product: true,
          },
        },
      },
      data: {
        ...createOrderDto,
        total: productsData.totalPrice,
        shipping_price: total_shipping,
        date: new Date(),
        customer: {
          connect: {
            id: customerId,
          },
        },
        products: {
          createMany: {
            data: createOrderDto.products,
          },
        },
      },
    });
  }
}
