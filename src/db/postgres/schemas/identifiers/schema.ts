import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import z from "zod";

import { toZodV4SchemaTyped } from "@/lib/zod-utils";

import { devices } from "../devices/schema";
import { organizations } from "../organizations/schema";
import { users } from "../users/schema";

export const identifiers = pgTable("identifiers", {
  id: serial().primaryKey().notNull(),
  identifier_id: text().notNull().unique(),
  factory_id: text().notNull().unique(),
  user_id: integer().notNull().references(() => users.id),
  organization_id: integer().notNull().references(() => organizations.id),
  created_by: integer().notNull().references(() => users.id),
  created_at: timestamp().defaultNow(),
});

export const identifier_status = pgTable("identifier_status", {
  id: serial().primaryKey().notNull(),
  identifier_id: integer().notNull().references(() => identifiers.id),
  is_active: boolean().notNull().default(false),
  created_by: integer().notNull().references(() => users.id),
  created_at: timestamp().defaultNow(),
});

export const identifier_reader_log = pgTable("identifier_reader_log", {
  id: serial().primaryKey().notNull(),
  factory_id: text().notNull(),
  device_id: integer().notNull().references(() => devices.id),
  created_at: timestamp().defaultNow(),
});

export const selectIdentifiersSchema = toZodV4SchemaTyped(createSelectSchema(identifiers));
export const insertIdentifierSchema = toZodV4SchemaTyped(createInsertSchema(identifiers)
  .required({
    identifier_id: true,
    factory_id: true,
    user_id: true,
    organization_id: true,
  }).omit({
    id: true,
    created_at: true,
  }));

// @ts-expect-error partial exists on zod v4 type
export const patchIdentifierSchema = insertIdentifierSchema.partial();

export const selectIdentifierStatusSchema = toZodV4SchemaTyped(createSelectSchema(identifier_status));
export const insertIdentifierStatusSchema = toZodV4SchemaTyped(createInsertSchema(identifier_status)
  .required({
    identifier_id: true,
    created_by: true,
  }).omit({
    id: true,
    created_at: true,
  }));

export const selectIdentifierReadsSchema = toZodV4SchemaTyped(createSelectSchema(identifier_reader_log));
export const insertIdentifierReadsSchema = toZodV4SchemaTyped(createInsertSchema(identifier_reader_log)
  .required({
    identifier_id: true,
    factory_id: true,
    user_id: true,
    organization_id: true,
  }).omit({
    id: true,
    created_at: true,
  }));

// @ts-expect-error partial exists on zod v4 type
export const patchIdentifierReadsSchema = insertIdentifierReadsSchema.partial();

export const selectNewIdentifierSchema = z.object({
  identifier: selectIdentifiersSchema,
  status: selectIdentifierStatusSchema.optional(),
});

export const insertNewIdentifierSchema = z.object({
  identifier: insertIdentifierSchema,
  status: insertIdentifierStatusSchema,
});

export const selectListIdentifiersSchema = z.object({
  id: z.number().optional(),
  identifier_id: z.string().optional(),
  factory_id: z.number().optional(),
  user_id: z.string().optional(),
  user_lida_id: z.string().optional(),
  user_name: z.string().optional(),
  user_last_name: z.string().optional(),
  organization_id: z.string().optional(),
  organization_name: z.string().optional(),
  is_active: z.boolean().optional(),
});

export const selectLastIdentifierRead = z.object({
  device_id: z.number(),
});
