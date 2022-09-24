import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}
  create(customerId: number, createOrderDto: CreateOrderDto) {
    return this.prisma.order.create({
      include: {
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
