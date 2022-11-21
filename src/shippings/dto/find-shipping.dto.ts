import { IsNotEmpty } from 'class-validator';

export class FindShippingDTO {
  @IsNotEmpty()
  products: any;

  @IsNotEmpty()
  zipcode: string;
}
