import { sql } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const tkaOtpChallenges = pgTable(
  "tka_otp_challenges",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    packageNumber: integer("package_number").notNull(),
    email: text("email").notNull(),
    codeHash: text("code_hash").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    attempts: integer("attempts").notNull().default(0),
    verifiedAt: timestamp("verified_at", { withTimezone: true }),
    preAuthHash: text("pre_auth_hash"),
    preAuthExpiresAt: timestamp("pre_auth_expires_at", { withTimezone: true }),
    consumedAt: timestamp("consumed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("tka_otp_challenges_email_created_idx").on(
      table.packageNumber,
      table.email,
      table.createdAt,
    ),
  ],
);

export const tkaExamSessions = pgTable(
  "tka_exam_sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    packageNumber: integer("package_number").notNull(),
    email: text("email").notNull(),
    name: text("name").notNull(),
    school: text("school").notNull(),
    deviceId: text("device_id").notNull(),
    sessionTokenHash: text("session_token_hash").notNull().unique(),
    answers: jsonb("answers").$type<Record<string, number>>().notNull().default({}),
    violationCount: integer("violation_count").notNull().default(0),
    status: text("status").notNull().default("active"),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    submittedAt: timestamp("submitted_at", { withTimezone: true }),
    submitReason: text("submit_reason"),
    result: jsonb("result").$type<Record<string, unknown>>(),
    spreadsheetSavedAt: timestamp("spreadsheet_saved_at", { withTimezone: true }),
    emailSentAt: timestamp("email_sent_at", { withTimezone: true }),
  },
  (table) => [
    index("tka_exam_sessions_active_expiry_idx").on(table.status, table.expiresAt),
    uniqueIndex("tka_exam_sessions_package_email_idx")
      .on(table.packageNumber, table.email)
      .where(sql`${table.status} IN ('active', 'submitted')`),
    uniqueIndex("tka_exam_sessions_package_device_idx")
      .on(table.packageNumber, table.deviceId)
      .where(sql`${table.status} IN ('active', 'submitted')`),
  ],
);

export const tkaExamViolations = pgTable(
  "tka_exam_violations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    sessionId: uuid("session_id")
      .notNull()
      .references(() => tkaExamSessions.id),
    clientEventId: uuid("client_event_id").notNull(),
    violationNumber: integer("violation_number").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("tka_exam_violations_session_event_idx").on(
      table.sessionId,
      table.clientEventId,
    ),
    index("tka_exam_violations_session_created_idx").on(
      table.sessionId,
      table.createdAt,
    ),
  ],
);
