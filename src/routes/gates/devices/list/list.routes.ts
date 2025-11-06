import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

import { selectListGateDevicesSchema } from "@/db/postgres/schemas/gates/schema";
import { notFoundSchema } from "@/lib/constants";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

const tags = ["Gates"];

export const listAllGateDevices = createRoute({
  tags,
  path: "/gates/devices/list/{id}",
  method: "get",
  security: [{ bearerAuth: [] }],
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectListGateDevicesSchema),
      "The list of gates",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "User not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export type ListAllGateDevicesRoute = typeof listAllGateDevices;