import { Injectable } from '@nestjs/common';
import axios from 'axios';
const qs = require('qs');
const convert = require('xml-js');

const OrderStatusMap = {
  1: 'WaitingForPayment',
  2: 'UnderAnalysis',
  3: 'Paid',
  4: 'Available',
  5: 'InDispute',
  6: 'Returned',
  7: 'Canceled',
  8: 'Debited',
  9: 'TemporaryRetention',
};

@Injectable()
export class PagseguroService {
  async fetchTransactionInfo(notificationCode: string) {
    const url = `${process.env.PAGSEGURO_WS_URL}/v3/transactions/notifications/${notificationCode}?email=${process.env.PAGSEGURO_EMAIL}&token=${process.env.PAGSEGURO_TOKEN}`;

    const response = await axios.get(url);

    const jsonData = JSON.parse(
      convert.xml2json(response.data, { compact: true }),
    );

    return {
      orderId: jsonData.transaction.reference._text,
      status: OrderStatusMap[jsonData.transaction.status._text],
    };
  }

  async generateCheckout(order) {
    const code = await this.generateCheckoutCode(order);
    return `${process.env.PAGSEGURO_URL}/v2/checkout/payment.html?code=${code}`;
  }

  async generateCheckoutCode(order) {
    const pagseguroPayload = {
      email: process.env.PAGSEGURO_EMAIL,
      token: process.env.PAGSEGURO_TOKEN,
      currency: 'BRL',
      reference: order.id,
      shippingCost: (order.shipping_price / 100).toFixed(2),
      notificationURL: process.env.PAGSEGURO_NOTIFICATION_URL,
    };

    let aux = 1;
    for (let product of order.products) {
      pagseguroPayload[`itemId${aux}`] = product.product.id;
      pagseguroPayload[`itemDescription${aux}`] = product.product.name;
      pagseguroPayload[`itemAmount${aux}`] = (
        product.product.price / 100
      ).toFixed(2);
      pagseguroPayload[`itemQuantity${aux}`] = product.quantity;

      aux++;
    }

    const url = `${process.env.PAGSEGURO_WS_URL}/v2/checkout?email=${process.env.PAGSEGURO_EMAIL}&token=${process.env.PAGSEGURO_TOKEN}`;

    const response = await axios.post(url, qs.stringify(pagseguroPayload), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=ISO-8859-1',
        Accept: 'application/xml; charset=ISO-8859-1',
      },
    });
    const data = JSON.parse(convert.xml2json(response.data, { compact: true }));
    return data.checkout.code._text;
  }
}
