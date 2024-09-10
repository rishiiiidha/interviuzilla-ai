import {  pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const interview = pgTable('interview', {
  id: serial('id').primaryKey(),
  jsonresponse: text('jsonresponse').notNull(),
  jsonquestionsrespnse: text('jsonquestionsresponse').notNull(),
  createdBy : varchar('createdBy').notNull(),
  createdAt : varchar('createdAt').notNull(),
  interviewId : varchar('interviewId').notNull()
});

export const userAnswer = pgTable("userAnswer", {
	id: serial("id").primaryKey(),
	interviewIdRef: varchar("interviewIdRef").notNull(),
	question: varchar("question").notNull(),
	correctAns: text("correctAns").notNull(),
	userAns: text("userAnswer").notNull(),
	feedback: text("feedback").notNull(),
	rating: varchar("rating").notNull(),
	userEmail: varchar("userEmail").notNull(),
	createdAt: varchar("createdAt").notNull(),
});