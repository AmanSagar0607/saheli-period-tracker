# 🗄️ Supabase Database Setup Guide for Saheli

This guide will help you connect the Saheli Period Tracker to your Supabase PostgreSQL database.

## Prerequisites

- Supabase account with a project created
- Project name: `saheli-period-tracker`
- Database credentials ready

## Setup Steps

### Step 1: Access Supabase SQL Editor

1. Go to your Supabase project dashboard
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query** to create a new SQL query

### Step 2: Create Database Schema

Copy and paste the following SQL into the Supabase SQL Editor and execute it:

```sql
-- Create ENUM type for user roles
CREATE TYPE "public"."role" AS ENUM('user', 'admin');

-- Create users table
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

-- Create user profiles table
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

-- Create period entries table
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

-- Create indexes for better query performance
CREATE INDEX "users_openId_idx" ON "users"("openId");
CREATE INDEX "userProfiles_userId_idx" ON "userProfiles"("userId");
CREATE INDEX "periodEntries_userId_idx" ON "periodEntries"("userId");
CREATE INDEX "periodEntries_date_idx" ON "periodEntries"("date");
```

### Step 3: Enable Row Level Security (RLS)

For security, enable RLS on the tables:

```sql
-- Enable RLS on all tables
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "userProfiles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "periodEntries" ENABLE ROW LEVEL SECURITY;

-- Create policies for users table (public read for auth, insert for new users)
CREATE POLICY "Users can read their own data"
ON "users" FOR SELECT
USING (auth.uid()::text = "openId");

CREATE POLICY "Anyone can create a user"
ON "users" FOR INSERT
WITH CHECK (true);

-- Create policies for user profiles (users can only access their own)
CREATE POLICY "Users can read their own profile"
ON "userProfiles" FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM "users" 
        WHERE "users"."id" = "userProfiles"."userId"
        AND "users"."openId" = auth.uid()::text
    )
);

CREATE POLICY "Users can update their own profile"
ON "userProfiles" FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM "users" 
        WHERE "users"."id" = "userProfiles"."userId"
        AND "users"."openId" = auth.uid()::text
    )
);

CREATE POLICY "Users can insert their own profile"
ON "userProfiles" FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM "users" 
        WHERE "users"."id" = "userProfiles"."userId"
        AND "users"."openId" = auth.uid()::text
    )
);

-- Create policies for period entries (users can only access their own)
CREATE POLICY "Users can read their own period entries"
ON "periodEntries" FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM "users" 
        WHERE "users"."id" = "periodEntries"."userId"
        AND "users"."openId" = auth.uid()::text
    )
);

CREATE POLICY "Users can create their own period entries"
ON "periodEntries" FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM "users" 
        WHERE "users"."id" = "periodEntries"."userId"
        AND "users"."openId" = auth.uid()::text
    )
);

CREATE POLICY "Users can update their own period entries"
ON "periodEntries" FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM "users" 
        WHERE "users"."id" = "periodEntries"."userId"
        AND "users"."openId" = auth.uid()::text
    )
);

CREATE POLICY "Users can delete their own period entries"
ON "periodEntries" FOR DELETE
USING (
    EXISTS (
        SELECT 1 FROM "users" 
        WHERE "users"."id" = "periodEntries"."userId"
        AND "users"."openId" = auth.uid()::text
    )
);
```

### Step 4: Update Environment Variables

Update your `.env` file with the Supabase connection string:

```env
DATABASE_URL=postgresql://postgres:LRhzAgYTBWuXYQLR@db.ytainvcojhyavymucinp.supabase.co:5432/postgres
```

### Step 5: Update Backend Configuration

The backend server will now use Supabase for data storage. Make sure your backend is configured to:

1. Use the `DATABASE_URL` environment variable
2. Connect using the PostgreSQL driver (already configured in `drizzle.config.ts`)
3. Use Drizzle ORM for database operations

### Step 6: Test the Connection

To verify the connection works:

```bash
# Test with a simple query
export DATABASE_URL="postgresql://postgres:LRhzAgYTBWuXYQLR@db.ytainvcojhyavymucinp.supabase.co:5432/postgres"
pnpm drizzle-kit introspect
```

## Database Schema Overview

### Users Table
Stores authenticated user information:
- `id` - Primary key (auto-increment)
- `openId` - OAuth identifier (unique)
- `name` - User's name
- `email` - User's email
- `loginMethod` - OAuth provider (e.g., "google")
- `role` - User role (user or admin)
- `createdAt` - Account creation timestamp
- `updatedAt` - Last update timestamp
- `lastSignedIn` - Last login timestamp

### User Profiles Table
Stores user preferences and cycle information:
- `id` - Primary key (auto-increment)
- `userId` - Foreign key to users table
- `age` - User's age
- `cycleLengthAverage` - Average cycle length (default: 28 days)
- `periodDurationAverage` - Average period duration (default: 5 days)
- `lastPeriodStart` - Last period start date (ISO format)
- `notificationsEnabled` - Notification preference (1 or 0)
- `onboardingCompleted` - Onboarding status (1 or 0)
- `createdAt` - Record creation timestamp
- `updatedAt` - Last update timestamp

### Period Entries Table
Stores daily period tracking data:
- `id` - Primary key (auto-increment)
- `userId` - Foreign key to users table
- `date` - Date of entry (ISO format: YYYY-MM-DD)
- `isPeriodDay` - Whether it's a period day (1 or 0)
- `flowLevel` - Flow intensity (Light, Medium, Heavy, None)
- `symptoms` - JSON array of symptoms
- `painIntensity` - Pain level (1-5 scale)
- `mood` - Mood (Happy, Sad, Angry, Anxious, Neutral)
- `energy` - Energy level (Low, Medium, High)
- `notes` - User notes
- `createdAt` - Record creation timestamp
- `updatedAt` - Last update timestamp

## Supabase Connection Details

| Property | Value |
|----------|-------|
| **Project Name** | saheli-period-tracker |
| **Database Type** | PostgreSQL |
| **Host** | db.ytainvcojhyavymucinp.supabase.co |
| **Port** | 5432 |
| **Database** | postgres |
| **Username** | postgres |
| **Password** | LRhzAgYTBWuXYQLR |

## Troubleshooting

### Connection Issues
- Verify your IP is whitelisted in Supabase
- Check that the password is correct
- Ensure the database URL is properly formatted

### Migration Issues
- Make sure the `pg` driver is installed: `pnpm add pg`
- Check that the database is accessible from your network
- Review Supabase logs for detailed error messages

### RLS Policy Issues
- Ensure auth is properly configured in your app
- Test policies by querying directly in Supabase SQL Editor
- Check that user IDs match between auth and database records

## Next Steps

1. **Update Backend Routes** - Create tRPC endpoints to interact with Supabase
2. **Implement Data Sync** - Update the frontend to sync with Supabase instead of local storage
3. **Add Real-time Features** - Use Supabase real-time subscriptions for live updates
4. **Set Up Backups** - Configure automated backups in Supabase dashboard

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

---

**Last Updated:** June 14, 2026
