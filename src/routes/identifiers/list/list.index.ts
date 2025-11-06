import { createRouter } from "@/lib/create-app";
import { authMiddleware } from "@/middlewares/auth-middleware";

import * as handlers from "./list.handlers";
import * as routes from "./list.routes";

const listIdentifiersRouter = createRouter();
listIdentifiersRouter.use(authMiddleware);
listIdentifiersRouter
  .openapi(routes.listAllIdentifiers, handlers.listAllIdentifiers)

export default listIdentifiersRouter;
