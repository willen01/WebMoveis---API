import { OmitType } from '@nestjs/swagger';
import { Customer } from '../entities/customer.entity';

export class CreateCustomerDto extends OmitType(Customer, ['id']) {}
