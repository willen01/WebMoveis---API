import { Controller, Get, Query, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  findAll(
    @Query('is_featured') is_featured: string,
    @Query('q') q: string,
    @Query('category_id') category_id: number,
    @Query('limit') limit: number,
  ) {
    return this.productsService.findAll({ is_featured, q, category_id, limit });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(+id);
    const relatedProducts = await this.productsService.findAll({
      category_id: product.category_id,
      limit: 4,
    });

    return {
      ...product,
      relatedProducts: relatedProducts,
    };
  }
}
