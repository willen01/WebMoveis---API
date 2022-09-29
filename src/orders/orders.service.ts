import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  findOrderById(orderId: number) {
    return this.prisma.order.findFirst({
      where: {
        id: orderId,
      },
      include: {
        customer: {
          select: {
            email: true,
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

  create(customerId: number, createOrderDto: CreateOrderDto) {
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
