import { asc, desc, eq } from "drizzle-orm";

import type { AppRouteHandler } from "@/lib/types";

import postgres from "@/db/postgres/postgres";

import { actions } from "@/db/postgres/schemas/actions/schema";
import { device_action_mode, device_status, devices } from "@/db/postgres/schemas/devices/schema";
import { device_roles } from "@/db/postgres/schemas/roles/device/schema";
import type { ListAllDevicesRoute } from "./list.routes";

export const listAllDevices: AppRouteHandler<ListAllDevicesRoute> = async (c) => {
  const listAllDevices = await postgres
    .selectDistinctOn([devices.id], {
      id: devices.id,
      device_id: devices.device_id,
      role_id: devices.role_id,
      role_name: device_roles.name,
      role_description: device_roles.description,
      action_id: device_action_mode.action_id,
      action_name: actions.name,
      action_description: actions.description,
      is_active: device_status.is_active,
    })
    .from(devices)
    .leftJoin(device_status, eq(devices.id, device_status.device_id))
    .leftJoin(device_roles, eq(devices.role_id, device_roles.id))
    .leftJoin(device_action_mode, eq(devices.id, device_action_mode.device_id))
    .leftJoin(actions, eq(device_action_mode.action_id, actions.id))
    .orderBy(asc(devices.id), desc(device_status.id))
  return c.json(listAllDevices);
};
