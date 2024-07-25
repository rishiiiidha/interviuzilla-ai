import {  pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const interview = pgTable('interview', {
  id: serial('id').primaryKey(),
  jsonresponse: text('jsonresponse').notNull(),
  jsonquestionsrespnse:text('jsonquestionsresponse').notNull(),
  createdBy : varchar('createdBy').notNull(),
  createdAt : varchar('createdAt').notNull(),
  interviewId : varchar('interviewId').notNull()
});
