import { paths } from "./paths";
import dotenv from "dotenv";
import { constants } from "./constants";

dotenv.config();

export interface HeadlessScraperConfig {
  env: {
    nodeEnv: string;
    development: boolean;
    production: boolean;
    test: boolean;
  };
  app: {
    name: string;
    port: number;
    fileExt: "js" | "ts";
  };
  logging: {
    level: "info" | "debug" | "error" | "trace";
    dir: string;
  };
}

/**
 * Manually set a well-documented config mapping for types.
 *
 * We don't need to set up any environment configuration since our environment variables
 * are mostly handled by Reliant.
 */
const { NODE_ENV = "development" } = process.env;

export const config: HeadlessScraperConfig = {
  env: {
    nodeEnv: NODE_ENV,
    development: NODE_ENV === "development",
    test: NODE_ENV === "test",
    production: NODE_ENV === "production",
  },
  app: { ...constants.app, fileExt: NODE_ENV === "production" ? "js" : "ts" },
  logging: {
    level: NODE_ENV === "production" ? "info" : "trace",
    dir: paths.logDir,
  },
};
