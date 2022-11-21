import { Injectable } from '@nestjs/common';
// import { Product } from '@prisma/client';
import { ProductsService } from 'src/products/products.service';
import { FindShippingDTO } from './dto/find-shipping.dto';
const frete = require('frete');

@Injectable()
export class ShippingsService {
  constructor(private readonly productService: ProductsService) {}
  async findShipping(query: FindShippingDTO) {
    const zipcode = query.zipcode;
    const products = JSON.parse(query.products);

    let shippingsParams = {
      totalWeigth: 0,
      width: 0,
      height: 0,
      length: 0,
      totalPrice: 0,
      shipping: []
    };
    for (const product of products) {
      const p = await this.productService.findOne(product.id, false, false);

      shippingsParams.length += p.length * product.quantity;
      shippingsParams.width += p.width * product.quantity;
      shippingsParams.height += p.height * product.quantity;
      shippingsParams.totalWeigth += p.weigth * product.quantity;
      shippingsParams.totalPrice += (p.price * product.quantity) / 100;
    }
    const shipping = await frete()
      .cepOrigem(process.env.FROM_ZIPCODE)
      .cepDestino(zipcode)
      .servico(frete.servicos.sedex)
      .peso(shippingsParams.totalWeigth)
      .comprimento(shippingsParams.length)
      .diametro(0)
      .formato(frete.formatos.caixaPacote)
      .valorDeclarado(shippingsParams.totalPrice)
      .altura(shippingsParams.height)
      .largura(shippingsParams.width)
      .precoPrazo(+zipcode);


    shippingsParams.shipping = shipping 

    return shippingsParams;
  }
}
