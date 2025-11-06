import { createRouter } from "@/lib/create-app";
import { authMiddleware } from "@/middlewares/auth-middleware";

import * as handlers from "./list.handlers";
import * as routes from "./list.routes";

const listTemporaryIdentifiersRouter = createRouter();
listTemporaryIdentifiersRouter.use(authMiddleware);
listTemporaryIdentifiersRouter
  .openapi(routes.listAllTemporaryIdentifiers, handlers.listAllTemporaryIdentifiers)

export default listTemporaryIdentifiersRouter;
