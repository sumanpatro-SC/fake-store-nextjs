import { db } from '../lib/db';
import { products } from '../lib/db/schema';

async function seed() {
  try {
    // Use fallback data since API might be blocked
    const data = [
      {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        price: 109.95,
        category: "men's clothing",
        description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        rating: { rate: 3.9, count: 120 },
      },
      {
        id: 2,
        title: "Mens Casual Premium Slim Fit T-Shirts",
        price: 22.3,
        category: "men's clothing",
        description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._UX._UX_.jpg",
        rating: { rate: 4.1, count: 259 },
      },
      {
        id: 3,
        title: "Mens Cotton Jacket",
        price: 55.99,
        category: "men's clothing",
        description: "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
        image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
        rating: { rate: 4.7, count: 500 },
      },
    ];

    for (const product of data) {
      await db.insert(products).values({
        id: product.id,
        title: product.title,
        price: product.price,
        category: product.category,
        description: product.description,
        image: product.image,
        rating: product.rating.rate,
        ratingCount: product.rating.count,
      });
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seed();