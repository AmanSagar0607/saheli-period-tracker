import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * User profile table - stores period tracking preferences and cycle information
 */
export const userProfiles = mysqlTable("userProfiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  age: int("age"),
  cycleLengthAverage: int("cycleLengthAverage").default(28).notNull(),
  periodDurationAverage: int("periodDurationAverage").default(5).notNull(),
  lastPeriodStart: varchar("lastPeriodStart", { length: 10 }).notNull(),
  notificationsEnabled: int("notificationsEnabled").default(1).notNull(),
  onboardingCompleted: int("onboardingCompleted").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = typeof userProfiles.$inferInsert;

/**
 * Period entries table - stores daily period tracking data
 */
export const periodEntries = mysqlTable("periodEntries", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  date: varchar("date", { length: 10 }).notNull(), // ISO format: YYYY-MM-DD
  isPeriodDay: int("isPeriodDay").default(0).notNull(),
  flowLevel: varchar("flowLevel", { length: 20 }), // Light, Medium, Heavy, None
  symptoms: text("symptoms"), // JSON array of symptoms
  painIntensity: int("painIntensity"), // 1-5 scale
  mood: varchar("mood", { length: 20 }), // Happy, Sad, Angry, Anxious, Neutral
  energy: varchar("energy", { length: 20 }), // Low, Medium, High
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PeriodEntry = typeof periodEntries.$inferSelect;
export type InsertPeriodEntry = typeof periodEntries.$inferInsert;
