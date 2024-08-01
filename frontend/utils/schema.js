import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDescription: varchar("jobDescription").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdAt: varchar("createdAt").notNull(),
  createdBy: varchar("createdBy").notNull(),
  mockId: varchar("mockId").notNull(),
});

export const UserAnswers = pgTable("userAnswers", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockId").notNull(),
  question: varchar("question").notNull(),
  answer: varchar("answer").notNull(),
  userAnswer: varchar("userAnswer").notNull(),
  feedback: text("feedback").notNull(),
  rating:varchar("rating").notNull(),
  userEmail: varchar("userEmail").notNull(),
  createdAt: varchar("createdAt").notNull(),
});
