import { eq, and } from "drizzle-orm";
import {
  users,
  userProfiles,
  periodEntries,
  type User,
  type InsertUser,
  type InsertUserProfile,
  type InsertPeriodEntry,
} from "../drizzle/schema";

// Database access is provided by the Manus platform
// The database connection is injected at runtime

// Placeholder for database - will be injected by the platform
let db: any = null;

// Initialize database from the Manus platform
async function getDb() {
  if (db) return db;
  try {
    // The database is available through the Manus SDK
    // For now, we'll use a mock implementation that will be replaced
    // by the actual database connection at runtime
    if (typeof globalThis !== "undefined" && (globalThis as any).__db) {
      db = (globalThis as any).__db;
      return db;
    }
    return null;
  } catch (error) {
    console.error("[DB] Failed to get database:", error);
    return null;
  }
}

/**
 * Get or create user profile
 */
export async function getUserProfile(userId: number) {
  const database = await getDb();
  if (!database) return null;

  const profile = await database
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.userId, userId))
    .limit(1);

  return profile[0] || null;
}

/**
 * Create or update user profile
 */
export async function saveUserProfile(userId: number, data: Partial<InsertUserProfile>) {
  const database = await getDb();
  if (!database) throw new Error("Database not available");

  const existing = await getUserProfile(userId);

  if (existing) {
    await database
      .update(userProfiles)
      .set(data)
      .where(eq(userProfiles.userId, userId));
    return getUserProfile(userId);
  } else {
    const result = await database.insert(userProfiles).values({
      userId,
      ...data,
    } as InsertUserProfile);
    return getUserProfile(userId);
  }
}

/**
 * Get all period entries for a user
 */
export async function getUserPeriodEntries(userId: number) {
  const database = await getDb();
  if (!database) return [];

  return database
    .select()
    .from(periodEntries)
    .where(eq(periodEntries.userId, userId))
    .orderBy(periodEntries.date);
}

/**
 * Get period entry for a specific date
 */
export async function getPeriodEntry(userId: number, date: string) {
  const database = await getDb();
  if (!database) return null;

  const entry = await database
    .select()
    .from(periodEntries)
    .where(and(eq(periodEntries.userId, userId), eq(periodEntries.date, date)))
    .limit(1);

  return entry[0] || null;
}

/**
 * Create or update period entry
 */
export async function savePeriodEntry(userId: number, date: string, data: Partial<InsertPeriodEntry>) {
  const database = await getDb();
  if (!database) throw new Error("Database not available");

  const existing = await getPeriodEntry(userId, date);

  if (existing) {
    await database
      .update(periodEntries)
      .set(data)
      .where(and(eq(periodEntries.userId, userId), eq(periodEntries.date, date)));
  } else {
    await database.insert(periodEntries).values({
      userId,
      date,
      ...data,
    } as InsertPeriodEntry);
  }

  return getPeriodEntry(userId, date);
}

/**
 * Delete period entry
 */
export async function deletePeriodEntry(userId: number, date: string) {
  const database = await getDb();
  if (!database) throw new Error("Database not available");

  await database
    .delete(periodEntries)
    .where(and(eq(periodEntries.userId, userId), eq(periodEntries.date, date)));
}

/**
 * Get period entries for a date range
 */
export async function getPeriodEntriesInRange(userId: number, startDate: string, endDate: string) {
  const database = await getDb();
  if (!database) return [];

  return database
    .select()
    .from(periodEntries)
    .where(
      and(
        eq(periodEntries.userId, userId),
        // Simple string comparison works for ISO dates
      ),
    )
    .orderBy(periodEntries.date);
}

/**
 * Get user by ID
 */
export async function getUser(userId: number) {
  const database = await getDb();
  if (!database) return null;

  const user = await database.select().from(users).where(eq(users.id, userId)).limit(1);

  return user[0] || null;
}

/**
 * Get user by OpenID
 */
export async function getUserByOpenId(openId: string) {
  const database = await getDb();
  if (!database) return null;

  const user = await database.select().from(users).where(eq(users.openId, openId)).limit(1);

  return user[0] || null;
}

/**
 * Upsert user (create or update)
 */
export async function upsertUser(data: Partial<InsertUser> & { openId: string }) {
  const database = await getDb();
  if (!database) throw new Error("Database not available");

  const existing = await getUserByOpenId(data.openId);

  if (existing) {
    await database.update(users).set(data).where(eq(users.openId, data.openId));
    return getUser(existing.id);
  } else {
    const result = await database.insert(users).values(data as InsertUser);
    const newUser = await getUserByOpenId(data.openId);
    return newUser;
  }
}
