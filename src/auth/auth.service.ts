import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomersService } from 'src/customers/customers.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly customerService: CustomersService,
    private readonly jwrService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const customer = await this.customerService.findOneByEmail(email);
    if (
      customer &&
      this.customerService.comparePassword(password, customer.password)
    ) {
      const { password, ...cust } = customer;
      return cust;
    }
    return null;
  }

  async login(customer) {
    return {
      token: this.jwrService.sign({
        email: customer.email,
        id: customer.id,
        name: customer.name,
      }),
    };
  }
}
