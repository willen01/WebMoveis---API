import { IsNotEmpty } from 'class-validator';

export class FindShippingDTO {
  @IsNotEmpty()
  products: string;

  @IsNotEmpty()
  zipcode: string;
}
