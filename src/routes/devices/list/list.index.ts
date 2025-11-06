import { createRouter } from "@/lib/create-app";
import { authMiddleware } from "@/middlewares/auth-middleware";

import * as handlers from "./list.handlers";
import * as routes from "./list.routes";

const listDeviceRouter = createRouter();
listDeviceRouter.use(authMiddleware);
listDeviceRouter
  .openapi(routes.listAllDevices, handlers.listAllDevices)

export default listDeviceRouter;
