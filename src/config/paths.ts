import path from "path";
import appRootPath from "app-root-path";

const appRoot = appRootPath.toString();

export const paths = {
  appRoot: appRoot.toString(),
  logDir: path.resolve(appRoot, "logs"),
  srcDir: path.resolve(appRoot, "src"),
  configDir: path.resolve(appRoot, "src", "config"),
  modelsDir: path.resolve(
    appRoot,
    "src",
    "infra",
    "database",
    "mongo",
    "models"
  ),
};
