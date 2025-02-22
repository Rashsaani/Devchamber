import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  // Get all subjects
  app.get("/api/subjects", async (_req, res) => {
    const subjects = await storage.getSubjects();
    res.json(subjects);
  });

  // Get single subject
  app.get("/api/subjects/:id", async (req, res) => {
    const subject = await storage.getSubject(parseInt(req.params.id));
    if (!subject) {
      return res.status(404).send("Subject not found");
    }
    res.json(subject);
  });

  // Get quizzes for a subject
  app.get("/api/subjects/:id/quizzes", async (req, res) => {
    const quizzes = await storage.getQuizzesBySubject(parseInt(req.params.id));
    res.json(quizzes);
  });

  // Get user progress
  app.get("/api/progress", async (req, res) => {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const progress = await storage.getProgress(req.user.id);
    res.json(progress);
  });

  // Save quiz progress
  app.post("/api/progress", async (req, res) => {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const progress = await storage.saveProgress({
      ...req.body,
      userId: req.user.id,
    });
    res.json(progress);
  });

  const httpServer = createServer(app);
  return httpServer;
}
