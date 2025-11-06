import { asc, desc, eq } from "drizzle-orm";

import type { AppRouteHandler } from "@/lib/types";

import postgres from "@/db/postgres/postgres";

import { identifier_status, identifiers } from "@/db/postgres/schemas/identifiers/schema";
import { organizations } from "@/db/postgres/schemas/organizations/schema";
import { user_information, users } from "@/db/postgres/schemas/users/schema";
import type { ListAllIdentifiersRoute } from "./list.routes";

export const listAllIdentifiers: AppRouteHandler<ListAllIdentifiersRoute> = async (c) => {
  const listAllIdentifiers = await postgres
    .selectDistinctOn([identifiers.id], {
      id: identifiers.id,
      identifier_id: identifiers.identifier_id,
      factory_id: identifiers.factory_id,
      user_id: identifiers.user_id,
      user_lida_id: users.lida_id,
      user_name: user_information.name,
      user_last_name: user_information.last_name,
      organization_id: identifiers.organization_id,
      organization_name: organizations.name,
      is_active: identifier_status.is_active,
    })
    .from(identifiers)
    .leftJoin(identifier_status, eq(identifiers.id, identifier_status.identifier_id))
    .leftJoin(users, eq(identifiers.user_id, users.id))
    .leftJoin(user_information, eq(identifiers.user_id, user_information.user_id))
    .leftJoin(organizations, eq(identifiers.organization_id, organizations.id))
    .orderBy(asc(identifiers.id), desc(identifier_status.id))
  return c.json(listAllIdentifiers);
};
