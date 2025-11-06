import { createRouter } from "@/lib/create-app";
import { authMiddleware } from "@/middlewares/auth-middleware";

import * as handlers from "./list.handlers";
import * as routes from "./list.routes";

const listGateDevicesRouter = createRouter();
listGateDevicesRouter.use(authMiddleware);
listGateDevicesRouter
  .openapi(routes.listAllGateDevices, handlers.listAllGateDevices)

export default listGateDevicesRouter;
