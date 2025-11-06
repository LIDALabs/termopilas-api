import { asc, desc, eq } from "drizzle-orm";

import type { AppRouteHandler } from "@/lib/types";

import postgres from "@/db/postgres/postgres";

import { temporary_identifier_bearer_status, temporary_identifier_bearers, temporary_identifiers } from "@/db/postgres/schemas/identifiers/temporary/schema";
import { organizations } from "@/db/postgres/schemas/organizations/schema";
import { user_information, users } from "@/db/postgres/schemas/users/schema";
import type { ListAllTemporaryIdentifiersRoute } from "./list.routes";

export const listAllTemporaryIdentifiers: AppRouteHandler<ListAllTemporaryIdentifiersRoute> = async (c) => {
  const listAllTemporaryIdentifiers = await postgres
    .selectDistinctOn([temporary_identifiers.id], {
      id: temporary_identifiers.id,
      temporary_identifier_id: temporary_identifiers.temporary_identifier_id,
      factory_id: temporary_identifiers.factory_id,
      user_id: temporary_identifier_bearers.user_id,
      user_lida_id: users.lida_id,
      user_name: user_information.name,
      user_last_name: user_information.last_name,
      organization_id: temporary_identifier_bearers.organization_id,
      organization_name: organizations.name,
      is_active: temporary_identifier_bearer_status.is_active,
    })
    .from(temporary_identifiers)
    .leftJoin(temporary_identifier_bearers, eq(temporary_identifiers.id, temporary_identifier_bearers.temporary_identifier_id))
    .leftJoin(temporary_identifier_bearer_status, eq(temporary_identifier_bearers.id, temporary_identifier_bearer_status.temporary_identifier_bearer_id))
    .leftJoin(users, eq(temporary_identifier_bearers.user_id, users.id))
    .leftJoin(user_information, eq(temporary_identifier_bearers.user_id, user_information.user_id))
    .leftJoin(organizations, eq(temporary_identifier_bearers.organization_id, organizations.id))
    .orderBy(asc(temporary_identifiers.id), desc(temporary_identifier_bearer_status.id))
  return c.json(listAllTemporaryIdentifiers);
};
