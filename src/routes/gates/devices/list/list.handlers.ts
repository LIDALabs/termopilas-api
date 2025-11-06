import { asc, desc, eq } from "drizzle-orm";

import type { AppRouteHandler } from "@/lib/types";
import * as HttpStatusCodes from "stoker/http-status-codes";

import postgres from "@/db/postgres/postgres";

import { devices } from "@/db/postgres/schemas/devices/schema";
import { gate_device_status, gate_devices } from "@/db/postgres/schemas/gates/schema";
import type { ListAllGateDevicesRoute } from "./list.routes";

export const listAllGateDevices: AppRouteHandler<ListAllGateDevicesRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const listAllGateDevices = await postgres
    .selectDistinctOn([gate_devices.id], {
      id: gate_devices.id,
      device_id: gate_devices.device_id,
      device_device_id: devices.device_id,
      is_active: gate_device_status.is_active,
    })
    .from(gate_devices)
    .where(eq(gate_devices.gate_id, id))
    .leftJoin(gate_device_status, eq(gate_devices.id, gate_device_status.gate_device_id))
    .leftJoin(devices, eq(gate_devices.device_id, devices.id))
    .orderBy(asc(gate_devices.id), desc(gate_device_status.id))

    if (!listAllGateDevices) {
      return c.json(
        {
          message: "Gate not found",
        },
        HttpStatusCodes.NOT_FOUND,
      );
    }

  return c.json(listAllGateDevices, HttpStatusCodes.OK);
};
