import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // =====================
  // User and Authentication Routes
  // =====================
  app.post("/api/users/register", async (req, res) => {
    try {
      const { username, password, email, displayName } = req.body;
      
      if (!username || !password || !email) {
        return res.status(400).json({ message: "Username, password, and email are required" });
      }
      
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }
      
      const user = await storage.createUser({ username, password, email, displayName });
      
      // Don't send password back in response
      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  app.post("/api/users/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Update last login time
      const updatedUser = await storage.updateUser(user.id, {
        lastLogin: new Date()
      });
      
      // Don't send password back in response
      const { password: _, ...userWithoutPassword } = updatedUser || user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to log in" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't send password back in response
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // =====================
  // Quiz Progress Routes
  // =====================
  app.get("/api/users/:userId/quiz-progress", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const progress = await storage.getUserQuizProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quiz progress" });
    }
  });

  app.post("/api/users/:userId/quiz-progress", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const { quizId, score, answers } = req.body;
      if (!quizId || score === undefined || !answers) {
        return res.status(400).json({ message: "Quiz ID, score, and answers are required" });
      }
      
      const progress = await storage.saveUserQuizProgress({
        userId,
        quizId,
        score,
        answers,
        completedAt: new Date(),
      });
      
      res.status(201).json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to save quiz progress" });
    }
  });

  // =====================
  // Badges Routes
  // =====================
  app.get("/api/badges", async (_req, res) => {
    try {
      const badges = await storage.getAllBadges();
      res.json(badges);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch badges" });
    }
  });

  app.get("/api/users/:userId/badges", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const badges = await storage.getUserBadges(userId);
      res.json(badges);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user badges" });
    }
  });

  app.post("/api/users/:userId/badges", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const { badgeId } = req.body;
      if (!badgeId) {
        return res.status(400).json({ message: "Badge ID is required" });
      }
      
      const userBadge = await storage.awardBadgeToUser({
        userId,
        badgeId,
        earnedAt: new Date(),
      });
      
      res.status(201).json(userBadge);
    } catch (error) {
      res.status(500).json({ message: "Failed to award badge" });
    }
  });

  // =====================
  // Quiz Categories Routes
  // =====================
  app.get("/api/quiz-categories", async (_req, res) => {
    try {
      const categories = await storage.getAllQuizCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quiz categories" });
    }
  });

  app.get("/api/quiz-categories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      
      const category = await storage.getQuizCategory(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quiz category" });
    }
  });

  app.get("/api/quiz-categories/:id/questions", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      
      const questions = await storage.getQuizQuestionsByCategory(id);
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch questions by category" });
    }
  });

  // =====================
  // Planets Routes
  // =====================
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

  // =====================
  // Quiz Questions Routes
  // =====================
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

  // =====================
  // Fun Facts Routes
  // =====================
  app.get("/api/fun-facts", async (_req, res) => {
    try {
      const facts = await storage.getAllFunFacts();
      res.json(facts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch fun facts" });
    }
  });

  // =====================
  // Explore Content Routes
  // =====================
  app.get("/api/explore-contents", async (_req, res) => {
    try {
      const contents = await storage.getAllExploreContents();
      res.json(contents);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch explore contents" });
    }
  });

  // =====================
  // Celestial Objects Routes
  // =====================
  app.get("/api/celestial-objects", async (req, res) => {
    try {
      const { type, parentId } = req.query;
      
      if (type) {
        // Filter by object type (moon, asteroid, comet, etc.)
        const objects = await storage.getCelestialObjectsByType(type as string);
        return res.json(objects);
      } else if (parentId) {
        // Filter by parent body (e.g., moons of a specific planet)
        const id = parseInt(parentId as string);
        if (isNaN(id)) {
          return res.status(400).json({ message: "Invalid parent ID" });
        }
        
        const objects = await storage.getCelestialObjectsByParent(id);
        return res.json(objects);
      }
      
      // No filters, return all objects
      const objects = await storage.getAllCelestialObjects();
      res.json(objects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch celestial objects" });
    }
  });

  app.get("/api/celestial-objects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid object ID" });
      }
      
      const object = await storage.getCelestialObject(id);
      if (!object) {
        return res.status(404).json({ message: "Celestial object not found" });
      }
      
      res.json(object);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch celestial object" });
    }
  });

  // =====================
  // Space Missions Routes
  // =====================
  app.get("/api/space-missions", async (req, res) => {
    try {
      const { status, target } = req.query;
      
      if (status) {
        // Filter by mission status
        const missions = await storage.getSpaceMissionsByStatus(status as string);
        return res.json(missions);
      } else if (target) {
        // Filter by target celestial body
        const missions = await storage.getSpaceMissionsByTarget(target as string);
        return res.json(missions);
      }
      
      // No filters, return all missions
      const missions = await storage.getAllSpaceMissions();
      res.json(missions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch space missions" });
    }
  });

  app.get("/api/space-missions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid mission ID" });
      }
      
      const mission = await storage.getSpaceMission(id);
      if (!mission) {
        return res.status(404).json({ message: "Space mission not found" });
      }
      
      res.json(mission);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch space mission" });
    }
  });

  // =====================
  // Worksheets Routes
  // =====================
  app.get("/api/worksheets", async (req, res) => {
    try {
      const { subject, ageRange } = req.query;
      
      if (subject) {
        // Filter by subject
        const worksheets = await storage.getWorksheetsBySubject(subject as string);
        return res.json(worksheets);
      } else if (ageRange) {
        // Filter by age range
        const worksheets = await storage.getWorksheetsByAgeRange(ageRange as string);
        return res.json(worksheets);
      }
      
      // No filters, return all worksheets
      const worksheets = await storage.getAllWorksheets();
      res.json(worksheets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch worksheets" });
    }
  });

  app.get("/api/worksheets/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid worksheet ID" });
      }
      
      const worksheet = await storage.getWorksheet(id);
      if (!worksheet) {
        return res.status(404).json({ message: "Worksheet not found" });
      }
      
      res.json(worksheet);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch worksheet" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
