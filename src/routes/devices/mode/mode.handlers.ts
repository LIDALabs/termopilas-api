import { desc, eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";

import type { AppRouteHandler } from "@/lib/types";

import postgres from "@/db/postgres/postgres";
import { device_action_mode, device_status, devices } from "@/db/postgres/schemas/devices/schema";

import type { CreateDeviceActionModesRoute, GetDeviceActionModesRoute } from "./mode.routes";

export const createDeviceMode: AppRouteHandler<CreateDeviceActionModesRoute> = async (c) => {
  const newDeviceActionModes = c.req.valid("json");
  const [inserted] = await postgres
    .insert(device_action_mode)
    .values(newDeviceActionModes)
    .returning();
  return c.json(inserted, HttpStatusCodes.OK);
};

export const getDeviceActionModes: AppRouteHandler<GetDeviceActionModesRoute> = async (c) => {
  const { slug } = c.req.valid("param");
  const [selectedDevice] = await postgres
    .select()
    .from(devices)
    .where(eq(devices.device_id, slug));

  const [selectedDeviceActionModes] = await postgres
    .select()
    .from(device_action_mode)
    .where(eq(device_action_mode.device_id, selectedDevice.id))
    .orderBy(desc(device_status.id))
    .limit(1);

  if (!selectedDeviceActionModes) {
    return c.json(
      {
        message: "Device Action Mode not found",
      },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  return c.json(selectedDeviceActionModes, HttpStatusCodes.OK);
};
