CREATE TYPE "public"."role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "periodEntries" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"date" varchar(10) NOT NULL,
	"isPeriodDay" integer DEFAULT 0 NOT NULL,
	"flowLevel" varchar(20),
	"symptoms" text,
	"painIntensity" integer,
	"mood" varchar(20),
	"energy" varchar(20),
	"notes" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userProfiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"age" integer,
	"cycleLengthAverage" integer DEFAULT 28 NOT NULL,
	"periodDurationAverage" integer DEFAULT 5 NOT NULL,
	"lastPeriodStart" varchar(10) NOT NULL,
	"notificationsEnabled" integer DEFAULT 1 NOT NULL,
	"onboardingCompleted" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"openId" varchar(64) NOT NULL,
	"name" text,
	"email" varchar(320),
	"loginMethod" varchar(64),
	"role" "role" DEFAULT 'user' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"lastSignedIn" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_openId_unique" UNIQUE("openId")
);
