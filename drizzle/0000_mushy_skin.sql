CREATE TABLE `expenses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`amount` numeric NOT NULL,
	`date` text NOT NULL,
	`transactionType` text NOT NULL,
	`category` text NOT NULL,
	`merchant` text
);
