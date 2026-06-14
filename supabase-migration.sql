-- Saheli Period Tracker - Supabase Database Migration
-- Execute this SQL in Supabase SQL Editor to set up the complete database schema

-- ============================================================================
-- Step 1: Create ENUM types
-- ============================================================================

CREATE TYPE "public"."role" AS ENUM('user', 'admin');

-- ============================================================================
-- Step 2: Create Tables
-- ============================================================================

-- Users table - stores authenticated user information
CREATE TABLE "users" (
    "id" serial PRIMARY KEY NOT NULL,
    "openId" varchar(64) NOT NULL UNIQUE,
    "name" text,
    "email" varchar(320),
    "loginMethod" varchar(64),
    "role" "role" DEFAULT 'user' NOT NULL,
    "createdAt" timestamp DEFAULT now() NOT NULL,
    "updatedAt" timestamp DEFAULT now() NOT NULL,
    "lastSignedIn" timestamp DEFAULT now() NOT NULL
);

-- User profiles table - stores user preferences and cycle information
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

-- Period entries table - stores daily period tracking data
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

-- ============================================================================
-- Step 3: Create Indexes for Performance
-- ============================================================================

CREATE INDEX "users_openId_idx" ON "users"("openId");
CREATE INDEX "userProfiles_userId_idx" ON "userProfiles"("userId");
CREATE INDEX "periodEntries_userId_idx" ON "periodEntries"("userId");
CREATE INDEX "periodEntries_date_idx" ON "periodEntries"("date");
CREATE INDEX "periodEntries_userId_date_idx" ON "periodEntries"("userId", "date");

-- ============================================================================
-- Step 4: Enable Row Level Security (RLS)
-- ============================================================================

ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "userProfiles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "periodEntries" ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- Step 5: Create RLS Policies for Users Table
-- ============================================================================

-- Allow users to read their own data
CREATE POLICY "Users can read their own data"
ON "users" FOR SELECT
USING (auth.uid()::text = "openId");

-- Allow anyone to create a user (for signup)
CREATE POLICY "Anyone can create a user"
ON "users" FOR INSERT
WITH CHECK (true);

-- Allow users to update their own data
CREATE POLICY "Users can update their own data"
ON "users" FOR UPDATE
USING (auth.uid()::text = "openId");

-- ============================================================================
-- Step 6: Create RLS Policies for User Profiles Table
-- ============================================================================

-- Allow users to read their own profile
CREATE POLICY "Users can read their own profile"
ON "userProfiles" FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM "users" 
        WHERE "users"."id" = "userProfiles"."userId"
        AND "users"."openId" = auth.uid()::text
    )
);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert their own profile"
ON "userProfiles" FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM "users" 
        WHERE "users"."id" = "userProfiles"."userId"
        AND "users"."openId" = auth.uid()::text
    )
);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile"
ON "userProfiles" FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM "users" 
        WHERE "users"."id" = "userProfiles"."userId"
        AND "users"."openId" = auth.uid()::text
    )
);

-- ============================================================================
-- Step 7: Create RLS Policies for Period Entries Table
-- ============================================================================

-- Allow users to read their own period entries
CREATE POLICY "Users can read their own period entries"
ON "periodEntries" FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM "users" 
        WHERE "users"."id" = "periodEntries"."userId"
        AND "users"."openId" = auth.uid()::text
    )
);

-- Allow users to create their own period entries
CREATE POLICY "Users can create their own period entries"
ON "periodEntries" FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM "users" 
        WHERE "users"."id" = "periodEntries"."userId"
        AND "users"."openId" = auth.uid()::text
    )
);

-- Allow users to update their own period entries
CREATE POLICY "Users can update their own period entries"
ON "periodEntries" FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM "users" 
        WHERE "users"."id" = "periodEntries"."userId"
        AND "users"."openId" = auth.uid()::text
    )
);

-- Allow users to delete their own period entries
CREATE POLICY "Users can delete their own period entries"
ON "periodEntries" FOR DELETE
USING (
    EXISTS (
        SELECT 1 FROM "users" 
        WHERE "users"."id" = "periodEntries"."userId"
        AND "users"."openId" = auth.uid()::text
    )
);

-- ============================================================================
-- Step 8: Create Helper Functions
-- ============================================================================

-- Function to get user ID from openId
CREATE OR REPLACE FUNCTION get_user_id(p_openId varchar)
RETURNS integer AS $$
BEGIN
    RETURN (SELECT id FROM "users" WHERE "openId" = p_openId LIMIT 1);
END;
$$ LANGUAGE plpgsql;

-- Function to get current user ID from auth
CREATE OR REPLACE FUNCTION get_current_user_id()
RETURNS integer AS $$
BEGIN
    RETURN (SELECT id FROM "users" WHERE "openId" = auth.uid()::text LIMIT 1);
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- Setup Complete!
-- ============================================================================
-- All tables, indexes, and RLS policies have been created successfully.
-- Your Saheli Period Tracker database is now ready to use with Supabase.
