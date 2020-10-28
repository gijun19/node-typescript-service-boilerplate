import {
  asClass,
  asFunction,
  asValue,
  createContainer,
  InjectionMode,
} from "awilix";
import { config, HeadlessScraperConfig } from "./config";
import { Application } from "~/core/infra/http/Application";
import { makeLogger } from "./core/infra/logging/makeLogger";
import winston from "winston";
import { scopePerRequest } from "awilix-express";
import { RequestHandler } from "express";

export interface AppCradle {
  app: Application;
  logger: winston.Logger;
  config: HeadlessScraperConfig;
  container: RequestHandler;
}

const container = createContainer<AppCradle>({
  injectionMode: InjectionMode.CLASSIC,
});

container
  .register({
    app: asClass(Application).singleton(),
  })
  .register({
    logger: asFunction(makeLogger).singleton(),
  })
  .register({ config: asValue(config) });

/**
 * Domain
 */

/**
 * Middlewares
 */
container.register({
  container: asValue(scopePerRequest(container)),
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
