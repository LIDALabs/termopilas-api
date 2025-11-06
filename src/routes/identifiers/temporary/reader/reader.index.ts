import { createRouter } from "@/lib/create-app";
import { authMiddleware } from "@/middlewares/auth-middleware";

import * as handlers from "./reader.handlers";
import * as routes from "./reader.routes";

const getLastReadedTemporaryIdentifierRouter = createRouter();
getLastReadedTemporaryIdentifierRouter.use(authMiddleware);
getLastReadedTemporaryIdentifierRouter
  .openapi(routes.getLastReadedTemporaryIdentifier, handlers.getLastReadedTemporaryIdentifier)

export default getLastReadedTemporaryIdentifierRouter;
