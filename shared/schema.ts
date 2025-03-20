import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  json,
  timestamp,
  uuid,
  primaryKey,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enhanced users table with additional profile fields
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  displayName: text("display_name"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastLogin: timestamp("last_login"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  displayName: true,
});

// User Quiz Progress table
export const userQuizProgress = pgTable("user_quiz_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  quizId: integer("quiz_id").notNull(),
  score: integer("score").notNull(),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
  answers: json("answers")
    .notNull()
    .$type<{ questionId: number; answerId: number; correct: boolean }[]>(),
});

export const insertUserQuizProgressSchema = createInsertSchema(
  userQuizProgress
).omit({
  id: true,
});

// Add quiz categories
export const quizCategories = pgTable("quiz_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  difficulty: text("difficulty").notNull(), // "beginner", "intermediate", "advanced"
  imageUrl: text("image_url"),
});

export const insertQuizCategorySchema = createInsertSchema(quizCategories).omit(
  {
    id: true,
  }
);

// Add planets table
export const planets = pgTable("planets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  overview: text("overview").notNull(),
  composition: text("composition").notNull(),
  exploration: text("exploration").notNull(),
  diameter: integer("diameter").notNull(),
  dayLength: text("day_length").notNull(),
  yearLength: text("year_length").notNull(),
  moons: integer("moons").notNull(),
  distanceFromSun: integer("distance_from_sun").notNull(),
  temperature: integer("temperature").notNull(),
  color: text("color").notNull(),
  ringColor: text("ring_color"),
  hasRings: boolean("has_rings").notNull(),
  orderFromSun: integer("order_from_sun").notNull(),
  features: json("features")
    .notNull()
    .$type<{ icon: string; title: string; description: string }[]>(),
  image: text("image").notNull(),
});

export const insertPlanetSchema = createInsertSchema(planets).omit({
  id: true,
});

// Add quiz questions table - Enhanced with category reference
export const quizQuestions = pgTable("quiz_questions", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").references(() => quizCategories.id),
  question: text("question").notNull(),
  options: json("options").notNull().$type<{ id: number; text: string }[]>(),
  correctOptionId: integer("correct_option_id").notNull(),
  explanation: text("explanation").notNull(),
  difficulty: text("difficulty").notNull().default("beginner"), // "beginner", "intermediate", "advanced"
});

export const insertQuizQuestionSchema = createInsertSchema(quizQuestions).omit({
  id: true,
});

// Add fun facts table
export const funFacts = pgTable("fun_facts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  iconBgColor: text("icon_bg_color").notNull(),
});

export const insertFunFactSchema = createInsertSchema(funFacts).omit({
  id: true,
});

// Add explore content table
export const exploreContents = pgTable("explore_contents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  link: text("link").notNull(),
});

export const insertExploreContentSchema = createInsertSchema(
  exploreContents
).omit({
  id: true,
});

// User Achievements/Badges
export const badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  criteria: text("criteria").notNull(), // Description of how to earn this badge
});

export const insertBadgeSchema = createInsertSchema(badges).omit({
  id: true,
});

export const userBadges = pgTable("user_badges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  badgeId: integer("badge_id")
    .notNull()
    .references(() => badges.id, { onDelete: "cascade" }),
  earnedAt: timestamp("earned_at").defaultNow().notNull(),
});

export const insertUserBadgeSchema = createInsertSchema(userBadges).omit({
  id: true,
});

// Export types for user progress tracking
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UserQuizProgress = typeof userQuizProgress.$inferSelect;
export type InsertUserQuizProgress = z.infer<
  typeof insertUserQuizProgressSchema
>;
export type QuizCategory = typeof quizCategories.$inferSelect;
export type InsertQuizCategory = z.infer<typeof insertQuizCategorySchema>;
export type Badge = typeof badges.$inferSelect;
export type InsertBadge = z.infer<typeof insertBadgeSchema>;
export type UserBadge = typeof userBadges.$inferSelect;
export type InsertUserBadge = z.infer<typeof insertUserBadgeSchema>;

// Add celestial objects (moons, asteroids, comets)
export const celestialObjects = pgTable("celestial_objects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // "moon", "asteroid", "comet", etc.
  parentBodyId: integer("parent_body_id").references(() => planets.id), // Reference to parent planet if applicable
  overview: text("overview").notNull(),
  composition: text("composition").notNull(),
  discovery: text("discovery").notNull(), // Information about when and who discovered it
  diameter: integer("diameter"), // in kilometers
  orbitPeriod: text("orbit_period"), // Time to orbit parent body
  distanceFromParent: integer("distance_from_parent"), // in kilometers
  image: text("image").notNull(),
  features:
    json("features").$type<
      { icon: string; title: string; description: string }[]
    >(),
});

export const insertCelestialObjectSchema = createInsertSchema(
  celestialObjects
).omit({
  id: true,
});

// Space missions
export const spaceMissions = pgTable("space_missions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  agency: text("agency").notNull(), // NASA, ESA, etc.
  launchDate: timestamp("launch_date").notNull(),
  endDate: timestamp("end_date"), // Null if still active
  description: text("description").notNull(),
  objectives: json("objectives").notNull().$type<string[]>(),
  targetBodies: json("target_bodies").notNull().$type<string[]>(), // Names of celestial bodies targeted
  achievements: json("achievements").$type<string[]>(),
  image: text("image").notNull(),
  missionType: text("mission_type").notNull(), // "flyby", "orbiter", "lander", "rover", etc.
  status: text("status").notNull(), // "planned", "active", "completed", "failed"
});

export const insertSpaceMissionSchema = createInsertSchema(spaceMissions).omit({
  id: true,
});

// Worksheets and educational activities
export const worksheets = pgTable("worksheets", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  ageRange: text("age_range").notNull(), // e.g., "6-8", "9-12"
  subject: text("subject").notNull(), // "solar system", "planets", "space exploration"
  pdfUrl: text("pdf_url").notNull(), // Link to downloadable PDF
  thumbnailUrl: text("thumbnail_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertWorksheetSchema = createInsertSchema(worksheets).omit({
  id: true,
});

// Export additional types
export type Planet = typeof planets.$inferSelect;
export type InsertPlanet = z.infer<typeof insertPlanetSchema>;
export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type InsertQuizQuestion = z.infer<typeof insertQuizQuestionSchema>;
export type FunFact = typeof funFacts.$inferSelect;
export type InsertFunFact = z.infer<typeof insertFunFactSchema>;
export type ExploreContent = typeof exploreContents.$inferSelect;
export type InsertExploreContent = z.infer<typeof insertExploreContentSchema>;
export type CelestialObject = typeof celestialObjects.$inferSelect;
export type InsertCelestialObject = z.infer<typeof insertCelestialObjectSchema>;
export type SpaceMission = typeof spaceMissions.$inferSelect;
export type InsertSpaceMission = z.infer<typeof insertSpaceMissionSchema>;
export type Worksheet = typeof worksheets.$inferSelect;
export type InsertWorksheet = z.infer<typeof insertWorksheetSchema>;
