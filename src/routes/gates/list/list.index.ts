import { createRouter } from "@/lib/create-app";
import { authMiddleware } from "@/middlewares/auth-middleware";

import * as handlers from "./list.handlers";
import * as routes from "./list.routes";

const listGatesRouter = createRouter();
listGatesRouter.use(authMiddleware);
listGatesRouter
  .openapi(routes.listAllGates, handlers.listAllGates)

export default listGatesRouter;
