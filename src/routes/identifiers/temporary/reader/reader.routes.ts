import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

import { selectTemporaryIdentifiersSchema } from "@/db/postgres/schemas/identifiers/temporary/schema";
import { notFoundSchema } from "@/lib/constants";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

const tags = ["Temporary Identifiers"];

export const getLastReadedTemporaryIdentifier = createRoute({
  tags,
  path: "/identifiers/reader/{id}",
  method: "get",
  security: [{ bearerAuth: [] }],
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectTemporaryIdentifiersSchema),
      "The list of identifiers",
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

export type GetLastReadedTemporaryIdentifierRoute = typeof getLastReadedTemporaryIdentifier;