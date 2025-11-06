import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

import { selectListGatesSchema } from "@/db/postgres/schemas/gates/schema";

const tags = ["Gates"];

export const listAllGates = createRoute({
  tags,
  path: "/gates/list",
  method: "get",
  security: [{ bearerAuth: [] }],
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectListGatesSchema),
      "The list of gates",
    ),
  },
});

export type ListAllGatesRoute = typeof listAllGates;