import { seedCategories } from './data/categories';

async function main() {
  await seedCategories();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
