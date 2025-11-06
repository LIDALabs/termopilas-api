import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema, SlugParamsSchema } from "stoker/openapi/schemas";

import { insertDeviceActionModeSchema, selectDeviceActionModesSchema } from "@/db/postgres/schemas/devices/schema";
import { notFoundSchema } from "@/lib/constants";

const tags = ["Devices"];

export const createDeviceActionModes = createRoute({
  tags,
  path: "/devices/mode",
  method: "post",
  security: [{ bearerAuth: [] }],
  request: {
    body: jsonContentRequired(
      insertDeviceActionModeSchema,
      "The status to update a device",
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectDeviceActionModesSchema,
      "The created status",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(selectDeviceActionModesSchema),
      "The validation error(s)",
    ),
  },
});

export const getDeviceActionModes = createRoute({
  tags,
  path: "/devices/mode/{slug}",
  method: "get",
  security: [{ bearerAuth: [] }],
  request: {
    params: SlugParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectDeviceActionModesSchema,
      "The requested status of a device",
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

export type CreateDeviceActionModesRoute = typeof createDeviceActionModes;
export type GetDeviceActionModesRoute = typeof getDeviceActionModes;
