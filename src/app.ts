import configureOpenAPI from "@/lib/configure-open-api";
import createApp from "@/lib/create-app";
import actions from "@/routes/actions/actions.index";
import actionsStatus from "@/routes/actions/status/status.index";
import devices from "@/routes/devices/devices.index";
import devicesList from "@/routes/devices/list/list.index";
import devicesActionMode from "@/routes/devices/mode/mode.index";
import devicesStatus from "@/routes/devices/status/status.index";
import gateDevicesList from "@/routes/gates/devices/list/list.index";
import gateExecute from "@/routes/gates/execute/execute.index";
import gates from "@/routes/gates/gates.index";
import gateList from "@/routes/gates/list/list.index";
import identifiers from "@/routes/identifiers/identifiers.index";
import identifiersList from "@/routes/identifiers/list/list.index";
import identifiersStatus from "@/routes/identifiers/status/status.index";
import temporaryIdentifiersBearers from "@/routes/identifiers/temporary/bearers/bearer.index";
import temporaryIdentifiersBearersStatus from "@/routes/identifiers/temporary/bearers/status/status.index";
import temporaryIdentifiersList from "@/routes/identifiers/temporary/list/list.index";
import temporaryIdentifiersReader from "@/routes/identifiers/temporary/reader/reader.index";
import temporaryIdentifiers from "@/routes/identifiers/temporary/temporary.index";
import index from "@/routes/index.route";
import organizations from "@/routes/organizations/organizations.index";
import organizationsStatus from "@/routes/organizations/status/status.index";
import deviceRole from "@/routes/roles/device/device.index";
import deviceRoleStatus from "@/routes/roles/device/status/status.index";
import usersRoleStatus from "@/routes/roles/user/status/status.index";
import userRole from "@/routes/roles/user/user.index";
import usersInfo from "@/routes/users/info/info.index";
import usersList from "@/routes/users/list/list.index";
import usersStatus from "@/routes/users/status/status.index";
import users from "@/routes/users/users.index";

const app = createApp();

configureOpenAPI(app);

const routes = [
  index,
  actionsStatus,
  actions,
  gateDevicesList,
  gateList,
  gateExecute,
  gates,
  usersList,
  usersInfo,
  usersStatus,
  users,
  organizationsStatus,
  organizations,
  temporaryIdentifiersReader,
  temporaryIdentifiersList,
  temporaryIdentifiersBearersStatus,
  temporaryIdentifiersBearers,
  temporaryIdentifiers,
  identifiersList,
  identifiersStatus,
  identifiers,
  devicesActionMode,
  devicesList,
  devicesStatus,
  devices,
  deviceRoleStatus,
  deviceRole,
  usersRoleStatus,
  userRole,
] as const;

routes.forEach((route) => {
  app.route("/", route);
});

// // Create HTTP server for both HTTP and WebSocket
// const server = serve({
//   fetch: app.fetch,
//   port: 3000,
// });

// // Initialize WebSocket server with the HTTP server
// initializeWebSocketServer(server);

export type AppType = typeof routes[number];

export default app;
