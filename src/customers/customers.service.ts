import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
const bcrypt = require('bcrypt');

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCustomerDto: CreateCustomerDto) {
    return this.prisma.customer.create({
      data: {
        ...createCustomerDto,
        password: this.preparePassword(createCustomerDto.password),
      },
    });
  }

  private preparePassword(plainTextPassword: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainTextPassword, salt);
  }

  comparePassword(plainTextPassword: string, hash: string) {
    return bcrypt.compareSync(plainTextPassword, hash);
  }

  findOneByEmail(email: string) {
    return this.prisma.customer.findFirst({
      where: { email: email },
    });
  }
}
