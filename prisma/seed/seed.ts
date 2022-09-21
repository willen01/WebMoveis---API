import { seedCategories } from './data/categories';
import { seedProducts } from './data/products';

async function main() {
  await seedCategories();
  await seedProducts();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
