import { AwilixContainer } from "awilix";
import { AppCradle } from "~/container";

declare global {
  namespace Express {
    interface Request {
      container: AwilixContainer<AppCradle>;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      NODE_ENV: string;
      DB_URL: string;
      JWT_SECRET: string;
    }
  }
}

export {};
