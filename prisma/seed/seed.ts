import { seedCategories } from './data/categories';
import { seedProducts } from './data/products';
import { seedProductImages } from './data/product_images';

async function main() {
  await seedCategories();
  await seedProducts();
  await seedProductImages();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
