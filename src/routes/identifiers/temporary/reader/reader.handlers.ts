import { desc, eq } from "drizzle-orm";

import type { AppRouteHandler } from "@/lib/types";


import postgres from "@/db/postgres/postgres";

import { identifier_reader_log } from "@/db/postgres/schemas/identifiers/schema";
import { temporary_identifiers } from "@/db/postgres/schemas/identifiers/temporary/schema";
import { GetLastReadedTemporaryIdentifierRoute } from "./reader.routes";

export const getLastReadedTemporaryIdentifier: AppRouteHandler<GetLastReadedTemporaryIdentifierRoute> = async (c) => {
  const {id} = c.req.valid("param");
  
  const [getLastReadedIdentifier] = await postgres
    .selectDistinctOn([identifier_reader_log.id], {
      id: temporary_identifiers.id,
      temporary_identifier_id: temporary_identifiers.temporary_identifier_id,
      factory_id: temporary_identifiers.factory_id,
      created_by: temporary_identifiers.created_by,
      created_at: temporary_identifiers.created_at,
    })
    .from(identifier_reader_log)
    .where(eq(identifier_reader_log.device_id, id))
    .leftJoin(temporary_identifiers, eq(identifier_reader_log.factory_id, temporary_identifiers.factory_id))
    .orderBy(desc(identifier_reader_log.id))
    .limit(1);
  return c.json(getLastReadedIdentifier);
};
