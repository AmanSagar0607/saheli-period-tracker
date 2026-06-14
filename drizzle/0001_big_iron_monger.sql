CREATE TABLE `periodEntries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`date` varchar(10) NOT NULL,
	`isPeriodDay` int NOT NULL DEFAULT 0,
	`flowLevel` varchar(20),
	`symptoms` text,
	`painIntensity` int,
	`mood` varchar(20),
	`energy` varchar(20),
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `periodEntries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userProfiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`age` int,
	`cycleLengthAverage` int NOT NULL DEFAULT 28,
	`periodDurationAverage` int NOT NULL DEFAULT 5,
	`lastPeriodStart` varchar(10) NOT NULL,
	`notificationsEnabled` int NOT NULL DEFAULT 1,
	`onboardingCompleted` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userProfiles_id` PRIMARY KEY(`id`)
);
