import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

import { selectListTemporaryIdentifiersSchema } from "@/db/postgres/schemas/identifiers/temporary/schema";

const tags = ["Temporary Identifiers"];

export const listAllTemporaryIdentifiers = createRoute({
  tags,
  path: "/identifiers/temporary/list",
  method: "get",
  security: [{ bearerAuth: [] }],
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectListTemporaryIdentifiersSchema),
      "The list of identifiers",
    ),
  },
});

export type ListAllTemporaryIdentifiersRoute = typeof listAllTemporaryIdentifiers;