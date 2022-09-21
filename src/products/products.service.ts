import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindProductDTO } from './dto/find-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(filters: FindProductDTO) {
    console.log('filters', filters);
    const where = {};
    let take = undefined;

    if (filters.is_featured != undefined) {
      where['is_featured'] = filters.is_featured == 'true' || false;
    }

    if (filters.q != undefined) {
      where['name'] = { contains: filters.q };
    }

    if (filters.category_id != undefined) {
      where['category_id'] = +filters.category_id;
    }

    if (filters.limit != undefined) {
      take = +filters.limit;
    }

    return this.prisma.product.findMany({
      include: {
        category: true,
      },
      where: where,
      take: take,
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} product`;
  // }
}
