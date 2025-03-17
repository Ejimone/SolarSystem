import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Keep the users table from original schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

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
  features: json("features").notNull().$type<{ icon: string; title: string; description: string }[]>(),
  image: text("image").notNull(),
});

export const insertPlanetSchema = createInsertSchema(planets).omit({
  id: true,
});

// Add quiz questions table
export const quizQuestions = pgTable("quiz_questions", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  options: json("options").notNull().$type<{ id: number; text: string }[]>(),
  correctOptionId: integer("correct_option_id").notNull(),
  explanation: text("explanation").notNull(),
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

export const insertExploreContentSchema = createInsertSchema(exploreContents).omit({
  id: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Planet = typeof planets.$inferSelect;
export type InsertPlanet = z.infer<typeof insertPlanetSchema>;

export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type InsertQuizQuestion = z.infer<typeof insertQuizQuestionSchema>;

export type FunFact = typeof funFacts.$inferSelect;
export type InsertFunFact = z.infer<typeof insertFunFactSchema>;

export type ExploreContent = typeof exploreContents.$inferSelect;
export type InsertExploreContent = z.infer<typeof insertExploreContentSchema>;
