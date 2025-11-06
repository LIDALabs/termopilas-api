import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

import { selectListIdentifiersSchema } from "@/db/postgres/schemas/identifiers/schema";

const tags = ["Identifiers"];

export const listAllIdentifiers = createRoute({
  tags,
  path: "/identifiers/list",
  method: "get",
  security: [{ bearerAuth: [] }],
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectListIdentifiersSchema),
      "The list of identifiers",
    ),
  },
});

export type ListAllIdentifiersRoute = typeof listAllIdentifiers;