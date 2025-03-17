import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for planets
  app.get("/api/planets", async (_req, res) => {
    try {
      const planets = await storage.getAllPlanets();
      res.json(planets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch planets" });
    }
  });

  app.get("/api/planets/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid planet ID" });
      }
      
      const planet = await storage.getPlanet(id);
      if (!planet) {
        return res.status(404).json({ message: "Planet not found" });
      }
      
      res.json(planet);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch planet" });
    }
  });

  // API routes for quiz questions
  app.get("/api/quiz-questions", async (_req, res) => {
    try {
      const questions = await storage.getAllQuizQuestions();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quiz questions" });
    }
  });

  app.get("/api/quiz-questions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid question ID" });
      }
      
      const question = await storage.getQuizQuestion(id);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      
      res.json(question);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quiz question" });
    }
  });

  // API routes for fun facts
  app.get("/api/fun-facts", async (_req, res) => {
    try {
      const facts = await storage.getAllFunFacts();
      res.json(facts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch fun facts" });
    }
  });

  // API routes for explore content
  app.get("/api/explore-contents", async (_req, res) => {
    try {
      const contents = await storage.getAllExploreContents();
      res.json(contents);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch explore contents" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
