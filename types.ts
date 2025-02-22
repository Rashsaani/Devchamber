import { User, Subject, Quiz, Progress, InsertUser, InsertProgress } from "@shared/schema";
import session from "express-session";

export interface IStorage {
  sessionStore: session.Store;
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getSubjects(): Promise<Subject[]>;
  getSubject(id: number): Promise<Subject | undefined>;
  getQuizzesBySubject(subjectId: number): Promise<Quiz[]>;
  getProgress(userId: number): Promise<Progress[]>;
  saveProgress(progress: InsertProgress): Promise<Progress>;
}
