import { createRouter } from "@/lib/create-app";
import { authMiddleware } from "@/middlewares/auth-middleware";

import * as handlers from "./mode.handlers";
import * as routes from "./mode.routes";

const deviceActionModeRouter = createRouter();
deviceActionModeRouter.use(authMiddleware);
deviceActionModeRouter
  .openapi(routes.createDeviceActionModes, handlers.createDeviceMode)
  .openapi(routes.getDeviceActionModes, handlers.getDeviceActionModes)

export default deviceActionModeRouter;
