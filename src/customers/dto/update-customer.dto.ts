import { PickType } from '@nestjs/swagger';
import { Customer } from '../entities/customer.entity';

export class UpdateCustomerDto extends PickType(Customer, ['name']) {}
