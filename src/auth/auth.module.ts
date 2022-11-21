import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { CustomersService } from 'src/customers/customers.service';
import { localStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { PagseguroModule } from 'src/pagseguro/pagseguro.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {},
    }), PagseguroModule
  ],
  providers: [
    AuthService,
    PrismaService,
    CustomersService,
    localStrategy,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
