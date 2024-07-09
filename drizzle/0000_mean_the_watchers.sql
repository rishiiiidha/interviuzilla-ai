CREATE TABLE IF NOT EXISTS "interviw" (
	"id" serial PRIMARY KEY NOT NULL,
	"jsonresponse" text NOT NULL,
	"createdBy" varchar NOT NULL,
	"createdAt" varchar NOT NULL,
	"interviewId" varchar NOT NULL
);
