import { IsDateString, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

//DESAFIO - adciona novos status de pedido além de WaitingForPayment e Paid
export enum OrderStatus {
  WaitingForPayment = 'WaitingForPayment',
  Paid = 'Paid',
  UnderAnalysis = 'UnderAnalysis',
  Available = 'Available',
  InDispute = 'InDispute',
  Returned = 'Returned',
  Canceled = 'Canceled',
  Debited = 'Debited',
  TemporaryRetention = 'TemporaryRetention',
}

export class Order {
  id: number;

  @IsDateString()
  date: Date;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsNumber()
  total: number;

  @IsNotEmpty()
  shipping_price: number;

  @IsNotEmpty()
  shipping: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  number: string;

  @IsNotEmpty()
  complement: string;

  @IsNotEmpty()
  postal_code: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNumber()
  customer_id: number;
}
