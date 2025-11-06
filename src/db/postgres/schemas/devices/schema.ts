import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import z from "zod";

import { toZodV4SchemaTyped } from "@/lib/zod-utils";

import { actions } from "../actions/schema";
import { device_roles } from "../roles/device/schema";
import { users } from "../users/schema";

export const devices = pgTable("devices", {
  id: serial().primaryKey().notNull(),
  device_id: text().notNull().unique(),
  token: text().notNull().unique(),
  role_id: integer().default(1).notNull().references(() => device_roles.id),
  created_at: timestamp().defaultNow(),
});

export const device_status = pgTable("device_status", {
  id: serial().primaryKey().notNull(),
  device_id: integer().notNull().references(() => devices.id),
  is_active: boolean().notNull().default(false),
  created_by: integer().notNull().references(() => users.id),
  created_at: timestamp().defaultNow(),
});

export const device_action_mode = pgTable("device_action_mode", {
  id: serial().primaryKey().notNull(),
  device_id: integer().notNull().references(() => devices.id),
  action_id: integer().notNull().references(() => actions.id),
  created_by: integer().notNull().references(() => users.id),
  created_at: timestamp().defaultNow(),
});


export const selectDevicesSchema = toZodV4SchemaTyped(createSelectSchema(devices));
export const insertDeviceSchema = toZodV4SchemaTyped(createInsertSchema(devices)
  .required({
    device_id: true,
    token: true,
    role_id: true,
  }).omit({
    id: true,
    created_at: true,
  }));

// @ts-expect-error partial exists on zod v4 type
export const patchDeviceSchema = insertDeviceSchema.partial();

export const selectDeviceStatusSchema = toZodV4SchemaTyped(createSelectSchema(device_status));
export const insertDeviceStatusSchema = toZodV4SchemaTyped(createInsertSchema(device_status)
  .required({
    device_id: true,
    created_by: true,
  }).omit({
    id: true,
    created_at: true,
  }));

export const selectNewDeviceSchema = z.object({
  device: selectDevicesSchema,
  status: selectDeviceStatusSchema.optional(),
});
export const insertNewDeviceSchema = z.object({
  device: insertDeviceSchema,
  status: insertDeviceStatusSchema,
});

export const selectDeviceActionModesSchema = toZodV4SchemaTyped(createSelectSchema(device_action_mode));
export const insertDeviceActionModeSchema = toZodV4SchemaTyped(createInsertSchema(device_action_mode)
  .required({
    device_id: true,
    action_id: true,
    created_by: true,
  }).omit({
    id: true,
    created_at: true,
  }));

// @ts-expect-error partial exists on zod v4 type
export const patchDeviceActionModeSchema = insertDeviceActionModeSchema.partial();

export const selectListDevicesSchema = z.object({
  id: z.number().optional(),
  device_id: z.string().optional(),
  role_id: z.number().optional(),
  role_name: z.string().optional(),
  role_description: z.string().optional(),
  action_id: z.number().optional(),
  action_name: z.string().optional(),
  action_description: z.string().optional(),
  is_active: z.boolean().optional(),
});
