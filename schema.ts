import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  country: text("country").notNull(),
  phone: text("phone").notNull(),
});

export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  content: jsonb("content").notNull(),
  price: integer("price").notNull(),
});

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  subjectId: integer("subject_id").notNull(),
  title: text("title").notNull(),
  questions: jsonb("questions").notNull(),
});

export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  subjectId: integer("subject_id").notNull(),
  quizId: integer("quiz_id").notNull(),
  score: integer("score").notNull(),
  completed: boolean("completed").notNull(),
});

export const insertUserSchema = createInsertSchema(users);
export const insertSubjectSchema = createInsertSchema(subjects);
export const insertQuizSchema = createInsertSchema(quizzes);
export const insertProgressSchema = createInsertSchema(progress);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertSubject = z.infer<typeof insertSubjectSchema>;
export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type InsertProgress = z.infer<typeof insertProgressSchema>;

export type User = typeof users.$inferSelect;
export type Subject = typeof subjects.$inferSelect;
export type Quiz = typeof quizzes.$inferSelect;
export type Progress = typeof progress.$inferSelect;
