import { asc, desc, eq } from "drizzle-orm";

import type { AppRouteHandler } from "@/lib/types";

import postgres from "@/db/postgres/postgres";
import { user_information, user_status, users } from "@/db/postgres/schemas/users/schema";

import { user_roles } from "@/db/postgres/schemas/roles/user/schema";
import type { ListAllUsersRoute } from "./list.routes";

export const listAllUsers: AppRouteHandler<ListAllUsersRoute> = async (c) => {
  const listAllUsers = await postgres
    .selectDistinctOn([users.id], {
      id: users.id,
      lida_id: users.lida_id,
      name: user_information.name,
      last_name: user_information.last_name,
      username: user_information.username,
      identity_number: user_information.identity_number,
      role_id: users.role_id,
      role_name: user_roles.name,
      role_description: user_roles.description,
      is_active: user_status.is_active,
    })
    .from(users)
    .leftJoin(user_information, eq(users.id, user_information.user_id))
    .leftJoin(user_status, eq(users.id, user_status.user_id))
    .leftJoin(user_roles, eq(users.role_id, user_roles.id))
    .orderBy(asc(users.id), desc(user_status.id))
  return c.json(listAllUsers);
};
