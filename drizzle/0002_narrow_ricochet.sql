PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_journals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`title` text NOT NULL,
	`start_date` integer NOT NULL,
	`end_date` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_journals`("id", "user_id", "title", "start_date", "end_date") SELECT "id", "user_id", "title", "start_date", "end_date" FROM `journals`;--> statement-breakpoint
DROP TABLE `journals`;--> statement-breakpoint
ALTER TABLE `__new_journals` RENAME TO `journals`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_runs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`user_id` integer NOT NULL,
	`journal_id` integer,
	`date` integer NOT NULL,
	`description` text,
	`distance` integer,
	`duration` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`journal_id`) REFERENCES `journals`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_runs`("id", "title", "user_id", "journal_id", "date", "description", "distance", "duration") SELECT "id", "title", "user_id", "journal_id", "date", "description", "distance", "duration" FROM `runs`;--> statement-breakpoint
DROP TABLE `runs`;--> statement-breakpoint
ALTER TABLE `__new_runs` RENAME TO `runs`;--> statement-breakpoint
CREATE TABLE `__new_scheduled_workouts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`user_id` integer,
	`journal_id` integer,
	`date` integer,
	`description` text,
	`duration` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`journal_id`) REFERENCES `journals`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_scheduled_workouts`("id", "title", "user_id", "journal_id", "date", "description", "duration") SELECT "id", "title", "user_id", "journal_id", "date", "description", "duration" FROM `scheduled_workouts`;--> statement-breakpoint
DROP TABLE `scheduled_workouts`;--> statement-breakpoint
ALTER TABLE `__new_scheduled_workouts` RENAME TO `scheduled_workouts`;