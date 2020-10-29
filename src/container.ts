import {
  asClass,
  asFunction,
  asValue,
  createContainer,
  InjectionMode,
} from "awilix";
import { config, HeadlessScraperConfig } from "./config";
import { Application } from "~/core/infra/http/Application";
import winston from "winston";
import { scopePerRequest } from "awilix-express";
import { Request, RequestHandler } from "express";
import { logger } from "./core/infra/logging";
import { httpLogger } from "./modules/user/interfaces/middleware/httpLogger";

export interface AppCradle {
  app: Application;
  logger: winston.Logger;
  config: HeadlessScraperConfig;
  container: RequestHandler;
  httpLogger: RequestHandler;
}

const container = createContainer<AppCradle>({
  injectionMode: InjectionMode.CLASSIC,
});

container
  .register({
    app: asClass(Application).singleton(),
  })
  .register({
    logger: asValue(logger),
  })
  .register({ config: asValue(config) });

/**
 * Domain
 */

/**
 * Middlewares
 */
container.register({
  httpLogger: asFunction(httpLogger).singleton(),
});
// container
//   .register({
//     loggerMiddleware: asFunction(loggerMiddleware).singleton(),
//   })
//   .register({
//     containerMiddleware: asValue(scopePerRequest(container)),
//     errorHandler: asValue(errorHandler),
//   });

/**
 * Repositories
 */
// container.register({
//   usersRepository: asClass(UsersRepository).singleton(),
// });

/**
 * Database
 */
// container.register({
//   database: asFunction(makeDatabase).singleton(),
// });

/**
 * Operations
 *
 * Use auto loading feature from `awilix`
 */
// container
//   .register({
//     createUser: asClass(CreateUser),
//   })
//   .register({
//     authenticate: asClass(Authenticate),
//   });

export { container };
