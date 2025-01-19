import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const expenses = sqliteTable('expenses', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  amount: integer('amount').notNull(),
  date: text('').notNull(),
  transactionType: text('transactionType').notNull(),
  category: text('category').notNull(),
  merchant: text('merchant')
  
});

export type PaymentRecord = typeof expenses.$inferSelect;