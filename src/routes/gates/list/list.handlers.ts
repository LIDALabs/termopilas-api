import { asc, desc, eq } from "drizzle-orm";

import type { AppRouteHandler } from "@/lib/types";

import postgres from "@/db/postgres/postgres";

import { gate_status, gates } from "@/db/postgres/schemas/gates/schema";
import type { ListAllGatesRoute } from "./list.routes";

export const listAllGates: AppRouteHandler<ListAllGatesRoute> = async (c) => {
  const listAllGates = await postgres
    .selectDistinctOn([gates.id], {
      id: gates.id,
      name: gates.name,
      description: gates.description,
      is_active: gate_status.is_active,
    })
    .from(gates)
    .leftJoin(gate_status, eq(gates.id, gate_status.gate_id))
    .orderBy(asc(gates.id), desc(gate_status.id))
  return c.json(listAllGates);
};
