PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_expenses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`amount` integer NOT NULL,
	`date` text NOT NULL,
	`transactionType` text NOT NULL,
	`category` text NOT NULL,
	`merchant` text
);
--> statement-breakpoint
INSERT INTO `__new_expenses`("id", "amount", "date", "transactionType", "category", "merchant") SELECT "id", "amount", "date", "transactionType", "category", "merchant" FROM `expenses`;--> statement-breakpoint
DROP TABLE `expenses`;--> statement-breakpoint
ALTER TABLE `__new_expenses` RENAME TO `expenses`;--> statement-breakpoint
PRAGMA foreign_keys=ON;