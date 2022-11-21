import { OmitType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Order } from '../entities/order.entity';
import { ProductOrder } from '../entities/product-order.entity';

export class CreateOrderDto extends OmitType(Order, [
  'id',
  'customer_id',
  'date',
  'total',
  'shipping_price'
]) {
  @IsNotEmpty()
  products: ProductOrder[];
}
