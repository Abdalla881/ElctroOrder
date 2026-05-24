/**
 * Seed script — food categories & items
 *
 * Usage (from the backend/ directory):
 *   npx ts-node -r tsconfig-paths/register src/seed.ts
 *
 * Or add to package.json:
 *   "seed": "ts-node -r tsconfig-paths/register src/seed.ts"
 *
 * Clears existing categories and items, then inserts fresh data.
 * Reads DATABASE_URI from the .env file automatically.
 */

import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as path from 'path';
import dns from 'dns';
import { ItemSchema } from './items/schema/item.schema';
import { CategorySchema } from './categories/schema/category.schema';

// Load .env from the backend root, regardless of cwd
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

// ─── Connect ────────────────────────────────────────────────────────────────
async function connect() {
  dns.setServers(['1.1.1.1', '8.8.8.8']);
  const uri = process.env.DATABASE_URI;
  if (!uri) throw new Error('DATABASE_URI is not defined in .env');
  await mongoose.connect(uri);
  console.log('✅  Connected to MongoDB');
}

// ─── Models ─────────────────────────────────────────────────────────────────
const Category = mongoose.model('category', CategorySchema);
const Item = mongoose.model('item', ItemSchema);

// ─── Category seed data ──────────────────────────────────────────────────────
const CATEGORIES = [
  { name: 'Burgers' },
  { name: 'Pizza' },
  { name: 'Sushi' },
  { name: 'Pasta' },
  { name: 'Salads' },
  { name: 'Sandwiches' },
  { name: 'Desserts' },
  { name: 'Drinks' },
];

// ─── Item seed factory (receives resolved category ids) ──────────────────────
function buildItems(catMap: Record<string, mongoose.Types.ObjectId>) {
  return [
    // ── Burgers ──────────────────────────────────────────────────────────────
    {
      name: 'Classic Smash Burger',
      nameAr: 'برجر كلاسيك',
      description: 'Double smash patty, cheddar cheese, pickles, special sauce',
      descriptionAr: 'باتي مدعوك مزدوج، جبنة شيدر، مخلل، صوص مميز',
      price: 8.99,
      category: catMap['Burgers'],
      rating: 4.8,
      popular: true,
    },
    {
      name: 'BBQ Bacon Burger',
      nameAr: 'برجر بيكون BBQ',
      description: 'Beef patty, crispy bacon, onion rings, BBQ sauce',
      descriptionAr: 'باتي لحم، بيكون مقرمش، حلقات بصل، صوص BBQ',
      price: 10.49,
      category: catMap['Burgers'],
      rating: 4.6,
      popular: true,
    },
    {
      name: 'Mushroom Swiss Burger',
      nameAr: 'برجر مشروم سويسري',
      description: 'Beef patty, sautéed mushrooms, Swiss cheese, aioli',
      descriptionAr: 'باتي لحم، مشروم مقلي، جبنة سويسرية، صوص ايولي',
      price: 9.99,
      category: catMap['Burgers'],
      rating: 4.5,
      popular: false,
    },

    // ── Pizza ────────────────────────────────────────────────────────────────
    {
      name: 'Margherita Pizza',
      nameAr: 'بيتزا مارغريتا',
      description: 'San Marzano tomato, fresh mozzarella, basil, olive oil',
      descriptionAr: 'طماطم سان مارزانو، موزاريلا طازجة، ريحان، زيت زيتون',
      price: 11.99,
      category: catMap['Pizza'],
      rating: 4.7,
      popular: true,
    },
    {
      name: 'Pepperoni Supreme',
      nameAr: 'بيتزا بيبروني سوبريم',
      description: 'Double pepperoni, mozzarella, bell peppers, olives',
      descriptionAr: 'بيبروني مضاعف، موزاريلا، فلفل رومي، زيتون',
      price: 13.99,
      category: catMap['Pizza'],
      rating: 4.9,
      popular: true,
    },
    {
      name: 'BBQ Chicken Pizza',
      nameAr: 'بيتزا دجاج BBQ',
      description: 'Pulled chicken, red onion, BBQ sauce, mozzarella',
      descriptionAr: 'دجاج مسحوب، بصل أحمر، صوص BBQ، موزاريلا',
      price: 14.49,
      category: catMap['Pizza'],
      rating: 4.6,
      popular: false,
    },

    // ── Sushi ────────────────────────────────────────────────────────────────
    {
      name: 'Salmon Avocado Roll (8 pcs)',
      nameAr: 'رول سالمون أفوكادو',
      description: 'Fresh salmon, creamy avocado, seasoned rice, nori',
      descriptionAr: 'سالمون طازج، أفوكادو كريمي، أرز متبل، نوري',
      price: 12.99,
      category: catMap['Sushi'],
      rating: 4.8,
      popular: true,
    },
    {
      name: 'Spicy Tuna Roll (8 pcs)',
      nameAr: 'رول تونة حارة',
      description: 'Spicy tuna, cucumber, sriracha mayo',
      descriptionAr: 'تونة حارة، خيار، مايونيز سريراتشا',
      price: 11.49,
      category: catMap['Sushi'],
      rating: 4.6,
      popular: true,
    },

    // ── Pasta ────────────────────────────────────────────────────────────────
    {
      name: 'Spaghetti Bolognese',
      nameAr: 'سباغيتي بولونيز',
      description: 'Slow-cooked beef ragù, fresh pasta, Parmesan',
      descriptionAr: 'راغو لحم بقري بطيء، باستا طازجة، بارميزان',
      price: 13.49,
      category: catMap['Pasta'],
      rating: 4.7,
      popular: true,
    },
    {
      name: 'Creamy Alfredo',
      nameAr: 'باستا ألفريدو كريمية',
      description: 'Fettuccine, heavy cream, Parmesan, garlic butter',
      descriptionAr: 'فيتوتشيني، كريمة ثقيلة، بارميزان، زبدة ثوم',
      price: 12.49,
      category: catMap['Pasta'],
      rating: 4.5,
      popular: false,
    },

    // ── Salads ───────────────────────────────────────────────────────────────
    {
      name: 'Caesar Salad',
      nameAr: 'سلطة سيزر',
      description: 'Romaine, house Caesar dressing, croutons, Parmesan',
      descriptionAr: 'خس روماني، صوص سيزر، خبز محمص، بارميزان',
      price: 7.99,
      category: catMap['Salads'],
      rating: 4.4,
      popular: false,
    },
    {
      name: 'Greek Salad',
      nameAr: 'سلطة يونانية',
      description: 'Tomato, cucumber, olives, feta cheese, red onion',
      descriptionAr: 'طماطم، خيار، زيتون، جبنة فيتا، بصل أحمر',
      price: 8.49,
      category: catMap['Salads'],
      rating: 4.5,
      popular: false,
    },

    // ── Sandwiches ───────────────────────────────────────────────────────────
    {
      name: 'Grilled Chicken Club',
      nameAr: 'ساندويش دجاج مشوي',
      description: 'Grilled chicken, bacon, lettuce, tomato, mayo, toasted bread',
      descriptionAr: 'دجاج مشوي، بيكون، خس، طماطم، مايونيز، خبز محمص',
      price: 9.49,
      category: catMap['Sandwiches'],
      rating: 4.6,
      popular: true,
    },
    {
      name: 'Philly Cheesesteak',
      nameAr: 'ساندويش فيلي',
      description: 'Shaved ribeye, caramelised onions, provolone cheese, hoagie roll',
      descriptionAr: 'شرائح ريب آي، بصل كراميل، جبنة بروفولون، خبز هواجي',
      price: 11.99,
      category: catMap['Sandwiches'],
      rating: 4.8,
      popular: true,
    },

    // ── Desserts ─────────────────────────────────────────────────────────────
    {
      name: 'Chocolate Lava Cake',
      nameAr: 'كيكة لابا بالشوكولاتة',
      description: 'Warm chocolate cake with a molten core, vanilla ice cream',
      descriptionAr: 'كيك شوكولاتة دافئ بقلب ذائب، آيس كريم فانيلا',
      price: 6.49,
      category: catMap['Desserts'],
      rating: 4.9,
      popular: true,
    },
    {
      name: 'Cheesecake Slice',
      nameAr: 'تشيز كيك',
      description: 'New York style, strawberry coulis, graham cracker crust',
      descriptionAr: 'على الطريقة النيويوركية، كولي فراولة، قاعدة بسكويت',
      price: 5.99,
      category: catMap['Desserts'],
      rating: 4.7,
      popular: false,
    },

    // ── Drinks ───────────────────────────────────────────────────────────────
    {
      name: 'Fresh Orange Juice',
      nameAr: 'عصير برتقال طازج',
      description: 'Cold-pressed, no added sugar, 400 ml',
      descriptionAr: 'معصور بارد، بدون سكر مضاف، 400 مل',
      price: 3.99,
      category: catMap['Drinks'],
      rating: 4.6,
      popular: true,
    },
    {
      name: 'Mango Lassi',
      nameAr: 'لاسي مانجو',
      description: 'Thick mango yogurt drink, cardamom, chilled',
      descriptionAr: 'مشروب لبن ماجو كثيف، هيل، مبرد',
      price: 4.49,
      category: catMap['Drinks'],
      rating: 4.8,
      popular: true,
    },
    {
      name: 'Sparkling Water',
      nameAr: 'مياه غازية',
      description: 'San Pellegrino sparkling mineral water, 500 ml',
      descriptionAr: 'مياه معدنية غازية سان بيليجرينو، 500 مل',
      price: 1.99,
      category: catMap['Drinks'],
      rating: 4.2,
      popular: false,
    },
  ];
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function seed() {
  await connect();

  // 1. Wipe existing data
  await Category.deleteMany({});
  await Item.deleteMany({});
  console.log('🗑️   Cleared existing categories and items');

  // 2. Insert categories
  const insertedCategories = await Category.insertMany(CATEGORIES);
  console.log(`📂  Inserted ${insertedCategories.length} categories`);

  // 3. Build a name → ObjectId map
  const catMap: Record<string, mongoose.Types.ObjectId> = {};
  for (const cat of insertedCategories) {
    catMap[(cat as any).name] = (cat as any)._id;
  }

  // 4. Insert items
  const items = buildItems(catMap);
  const insertedItems = await Item.insertMany(items);
  console.log(`🍔  Inserted ${insertedItems.length} items`);

  console.log('\n✅  Seeding complete!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('❌  Seeding failed:', err);
  mongoose.disconnect();
  process.exit(1);
});
