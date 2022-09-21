import { Controller, Get, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findCategories(@Query('limit') limit) {
    return this.categoriesService.findAllCategories(+limit || 10);
  }
}
