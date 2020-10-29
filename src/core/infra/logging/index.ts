import { makeLogger } from "./makeLogger";

export const stream = {
  write(message: string): void {
    logger.log("info", message);
  },
};

export const logger = makeLogger();
