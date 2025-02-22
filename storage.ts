import { IStorage } from "./types";
import { User, Subject, Quiz, Progress, InsertUser, InsertSubject, InsertQuiz, InsertProgress } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import connectPg from "connect-pg-simple";
import session from "express-session";
import { pool } from "./db";
import { users, subjects, quizzes, progress } from "@shared/schema";

const PostgresSessionStore = connectPg(session);

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getSubjects(): Promise<Subject[]> {
    return await db.select().from(subjects);
  }

  async getSubject(id: number): Promise<Subject | undefined> {
    const [subject] = await db.select().from(subjects).where(eq(subjects.id, id));
    return subject;
  }

  async getQuizzesBySubject(subjectId: number): Promise<Quiz[]> {
    return await db.select().from(quizzes).where(eq(quizzes.subjectId, subjectId));
  }

  async getProgress(userId: number): Promise<Progress[]> {
    return await db.select().from(progress).where(eq(progress.userId, userId));
  }

  async saveProgress(insertProgress: InsertProgress): Promise<Progress> {
    const [savedProgress] = await db.insert(progress).values(insertProgress).returning();
    return savedProgress;
  }
}

export const storage = new DatabaseStorage();