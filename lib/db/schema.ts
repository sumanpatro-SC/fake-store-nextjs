import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: integer('email_verified', { mode: 'timestamp' }),
  image: text('image'),
});

export const accounts = sqliteTable('accounts', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type'),
  provider: text('provider'),
  providerAccountId: text('provider_account_id'),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
});

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  sessionToken: text('session_token').notNull().unique(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: integer('expires', { mode: 'timestamp' }).notNull(),
});

export const products = sqliteTable('products', {
  id: integer('id').primaryKey(),
  title: text('title'),
  price: real('price'),
  category: text('category'),
  description: text('description'),
  image: text('image'),
  rating: real('rating'),
  ratingCount: integer('rating_count'),
});

export const cartItems = sqliteTable('cart_items', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  productId: integer('product_id').references(() => products.id),
  quantity: integer('quantity'),
});

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  total: real('total'),
  status: text('status'),
  createdAt: integer('created_at', { mode: 'timestamp' }),
});

export const orderItems = sqliteTable('order_items', {
  id: text('id').primaryKey(),
  orderId: text('order_id').references(() => orders.id),
  productId: integer('product_id').references(() => products.id),
  quantity: integer('quantity'),
  price: real('price'),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  cartItems: many(cartItems),
  orders: many(orders),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const productsRelations = relations(products, ({ many }) => ({
  cartItems: many(cartItems),
  orderItems: many(orderItems),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  user: one(users, { fields: [cartItems.userId], references: [users.id] }),
  product: one(products, { fields: [cartItems.productId], references: [products.id] }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  product: one(products, { fields: [orderItems.productId], references: [products.id] }),
}));