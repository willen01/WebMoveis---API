import { PrismaClient } from '@prisma/client';

export const productsToInsert = [
  {
    name: 'Produto 01',
    category: {
      connect: {
        id: 1,
      },
    },
    description: 'Teste de descrição',
    discount: 0,
    height: 2,
    image: 'https://via.placeholder.com/360x360',
    is_featured: true,
    price: 10000,
    short_description: 'Descrição curta teste',
    weigth: 10,
    width: 11,
    length: 16,
  },
  {
    name: 'Produto 02',
    category: {
      connect: {
        id: 2,
      },
    },
    description: 'Teste de descrição',
    discount: 0,
    height: 2,
    image: 'https://via.placeholder.com/360x360',
    is_featured: true,
    price: 10000,
    short_description: 'Descrição curta teste',
    weigth: 10,
    width: 11,
    length: 16,
  },
  {
    name: 'Produto 03',
    category: {
      connect: {
        id: 3,
      },
    },
    description: 'Teste de descrição',
    discount: 0,
    height: 2,
    image: 'https://via.placeholder.com/360x360',
    is_featured: false,
    price: 10000,
    short_description: 'Descrição curta teste',
    weigth: 10,
    width: 11,
    length: 16,
  },
  {
    name: 'Produto 04',
    category: {
      connect: {
        id: 1,
      },
    },
    description: 'Teste de descrição',
    discount: 0,
    height: 2,
    image: 'https://via.placeholder.com/360x360',
    is_featured: false,
    price: 10000,
    short_description: 'Descrição curta teste',
    weigth: 10,
    width: 11,
    length: 16,
  },
];

export async function seedProducts() {
  const prisma = new PrismaClient();
  for (const product of productsToInsert) {
    const prod = await prisma.product.findFirst({
      where: { name: product.name },
    });
    if (!prod) await prisma.product.create({ data: product });
  }
}
