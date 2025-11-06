import { createRouter } from "@/lib/create-app";
import { authMiddleware } from "@/middlewares/auth-middleware";

import * as handlers from "./list.handlers";
import * as routes from "./list.routes";

const listUserRouter = createRouter();
listUserRouter.use(authMiddleware);
listUserRouter
  .openapi(routes.listAllUsers, handlers.listAllUsers)

export default listUserRouter;
