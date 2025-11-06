import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

import { selectListUserSchema } from "@/db/postgres/schemas/users/schema";

const tags = ["Users"];

export const listAllUsers = createRoute({
  tags,
  path: "/users/list",
  method: "get",
  security: [{ bearerAuth: [] }],
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectListUserSchema),
      "The list of users",
    ),
  },
});

export type ListAllUsersRoute = typeof listAllUsers;