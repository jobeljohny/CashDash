
import { sqliteTable, text, integer,numeric } from 'drizzle-orm/sqlite-core';

export const expenses = sqliteTable('expenses', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  amount: numeric('amount').notNull(),
  date: text('').notNull(),
  transactionType: text('transactionType').notNull(),
  category: text('category').notNull(),
  merchant: text('merchant')
  
});



// Export Task to use as an interface in your app
export type Task = typeof expenses.$inferSelect;