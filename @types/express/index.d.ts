import { AwilixContainer } from "awilix";
import { AppCradle } from "~/container";

declare global {
  namespace Express {
    interface Request {
      container: AwilixContainer<AppCradle>;
    }
  }
}

export {};
