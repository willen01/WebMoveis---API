import { PrismaClient } from '@prisma/client';

export const productImagesToInsert = [
  {
    product_id: 5,
    image_url: 'https://via.placeholder.com/360x360',
    description: 'Imagem 01 do produto 01',
  },
  {
    product_id: 5,
    image_url: 'https://via.placeholder.com/360x360',
    description: 'Imagem 01 do produto 01',
  },
  {
    product_id: 6,
    image_url: 'https://via.placeholder.com/360x360',
    description: 'Imagem 01 do produto 02',
  },
  {
    product_id: 7,
    image_url: 'https://via.placeholder.com/360x360',
    description: 'Imagem 01 do produto 03',
  },
  {
    product_id: 8,
    image_url: 'https://via.placeholder.com/360x360',
    description: 'Imagem 01 do produto 04',
  },
];

export async function seedProductImages() {
  const prisma = new PrismaClient();
  for (const productImage of productImagesToInsert) {
    const obj = await prisma.productImage.findFirst({
      where: { description: productImage.description },
    });
    if (!obj) await prisma.productImage.create({ data: productImage });
  }
}
