import type { Category, Product } from "@/types";

export const categories: Category[] = [
  { id: "burgers", name: "Burgers", nameAr: "برجر", emoji: "🍔" },
  { id: "pizza", name: "Pizza", nameAr: "بيتزا", emoji: "🍕" },
  { id: "sushi", name: "Sushi", nameAr: "سوشي", emoji: "🍣" },
  { id: "pasta", name: "Pasta", nameAr: "باستا", emoji: "🍝" },
  { id: "salads", name: "Salads", nameAr: "سلطات", emoji: "🥗" },
  { id: "desserts", name: "Desserts", nameAr: "حلويات", emoji: "🍰" },
  { id: "drinks", name: "Drinks", nameAr: "مشروبات", emoji: "🥤" },
];

const img = (q: string) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=800&q=80`;

export const products: Product[] = [
  { id: "p1", name: "Smash Cheeseburger", nameAr: "تشيز برجر", description: "Double beef patty, american cheese, pickles, special sauce.", descriptionAr: "قطعتين لحم بقري، جبنة شيدر، مخلل، صوص خاص.", price: 145, image: img("photo-1568901346375-23c9450c58cd"), category: "burgers", rating: 4.8, popular: true },
  { id: "p2", name: "BBQ Bacon Burger", nameAr: "برجر باربكيو", description: "Smokey BBQ sauce, crispy bacon, onion rings.", descriptionAr: "صوص باربكيو مدخن، بيكون مقرمش، حلقات بصل.", price: 165, image: img("photo-1571091718767-18b5b1457add"), category: "burgers", rating: 4.7 },
  { id: "p3", name: "Margherita Pizza", nameAr: "بيتزا مارجريتا", description: "San Marzano tomatoes, fresh mozzarella, basil.", descriptionAr: "طماطم سان مارزانو، موتزاريلا طازجة، ريحان.", price: 180, image: img("photo-1574071318508-1cdbab80d002"), category: "pizza", rating: 4.9, popular: true },
  { id: "p4", name: "Pepperoni Supreme", nameAr: "بيبروني سوبريم", description: "Loaded with pepperoni and three cheeses.", descriptionAr: "بيبروني وفير وثلاث أنواع جبن.", price: 210, image: img("photo-1565299624946-b28f40a0ae38"), category: "pizza", rating: 4.6 },
  { id: "p5", name: "Salmon Nigiri Set", nameAr: "نيجيري سلمون", description: "8 pieces of fresh Atlantic salmon nigiri.", descriptionAr: "٨ قطع نيجيري سلمون أطلسي طازج.", price: 240, image: img("photo-1579871494447-9811cf80d66c"), category: "sushi", rating: 4.9, popular: true },
  { id: "p6", name: "Rainbow Roll", nameAr: "رول قوس قزح", description: "California roll topped with assorted sashimi.", descriptionAr: "كاليفورنيا رول مع تشكيلة ساشيمي.", price: 220, image: img("photo-1617196034796-73dfa7b1fd56"), category: "sushi", rating: 4.7 },
  { id: "p7", name: "Truffle Carbonara", nameAr: "كاربونارا بالكمأ", description: "Spaghetti, pancetta, egg yolk, black truffle.", descriptionAr: "سباجيتي، بانشيتا، صفار بيض، كمأة سوداء.", price: 195, image: img("photo-1612874742237-6526221588e3"), category: "pasta", rating: 4.8, popular: true },
  { id: "p8", name: "Penne Arrabbiata", nameAr: "بيني أرابياتا", description: "Spicy tomato sauce, garlic, chili, parsley.", descriptionAr: "صلصة طماطم حارة، ثوم، فلفل، بقدونس.", price: 150, image: img("photo-1473093295043-cdd812d0e601"), category: "pasta", rating: 4.5 },
  { id: "p9", name: "Caesar Salad", nameAr: "سلطة سيزر", description: "Romaine, parmesan, croutons, classic dressing.", descriptionAr: "خس روماني، بارميزان، كروتون، صوص كلاسيكي.", price: 120, image: img("photo-1546793665-c74683f339c1"), category: "salads", rating: 4.4 },
  { id: "p10", name: "Quinoa Power Bowl", nameAr: "بول كينوا", description: "Quinoa, avocado, chickpeas, tahini dressing.", descriptionAr: "كينوا، أفوكادو، حمص، صوص طحينة.", price: 135, image: img("photo-1512621776951-a57141f2eefd"), category: "salads", rating: 4.6 },
  { id: "p11", name: "Molten Chocolate Cake", nameAr: "كيك شوكولاتة سائلة", description: "Warm chocolate cake with vanilla ice cream.", descriptionAr: "كيك شوكولاتة دافئ مع آيس كريم فانيليا.", price: 95, image: img("photo-1606313564200-e75d5e30476c"), category: "desserts", rating: 4.9, popular: true },
  { id: "p12", name: "Tiramisu", nameAr: "تيراميسو", description: "Coffee soaked ladyfingers, mascarpone cream.", descriptionAr: "بسكويت مغمس بالقهوة، كريمة ماسكاربوني.", price: 90, image: img("photo-1571877227200-a0d98ea607e9"), category: "desserts", rating: 4.7 },
  { id: "p13", name: "Fresh Mango Juice", nameAr: "عصير مانجو طازج", description: "Cold pressed mango with a hint of lime.", descriptionAr: "مانجو طازج مع لمسة ليمون.", price: 45, image: img("photo-1546173159-315724a31696"), category: "drinks", rating: 4.5 },
  { id: "p14", name: "Iced Latte", nameAr: "لاتيه مثلج", description: "Double espresso, milk, ice.", descriptionAr: "إسبريسو مزدوج، حليب، ثلج.", price: 55, image: img("photo-1517701604599-bb29b565090c"), category: "drinks", rating: 4.6 },
];

export interface Offer {
  id: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  badge: string;
  badgeAr: string;
  image: string;
}

export const offers: Offer[] = [
  { id: "o1", title: "50% off your first order", titleAr: "خصم 50% على أول طلب", subtitle: "Use code: FIRST50", subtitleAr: "استخدم الكود: FIRST50", badge: "New", badgeAr: "جديد", image: img("photo-1565299624946-b28f40a0ae38") },
  { id: "o2", title: "Free delivery this weekend", titleAr: "توصيل مجاني هذا الأسبوع", subtitle: "On orders over EGP 150", subtitleAr: "على الطلبات فوق 150 ج.م", badge: "Weekend", badgeAr: "ويكند", image: img("photo-1513104890138-7c749659a591") },
  { id: "o3", title: "Buy 1 Get 1 on desserts", titleAr: "اشترِ 1 واحصل على 1 من الحلويات", subtitle: "Sweeten your night", subtitleAr: "حلِّي ليلتك", badge: "Sweet", badgeAr: "حلو", image: img("photo-1606313564200-e75d5e30476c") },
];
