import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

import { selectListDevicesSchema } from "@/db/postgres/schemas/devices/schema";

const tags = ["Devices"];

export const listAllDevices = createRoute({
  tags,
  path: "/devices/list",
  method: "get",
  security: [{ bearerAuth: [] }],
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectListDevicesSchema),
      "The list of devices",
    ),
  },
});

export type ListAllDevicesRoute = typeof listAllDevices;