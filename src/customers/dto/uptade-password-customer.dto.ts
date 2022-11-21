import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordCustomerDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;
  
  @IsNotEmpty()
  previousPassword: string;
}
