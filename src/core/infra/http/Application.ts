import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import compression from "compression";
import { HeadlessScraperConfig } from "~/config";
import helmet from "helmet";
import { Logger } from "winston";
import { container } from "~/container";

export class Application {
  protected app: express.Application;
  constructor(
    protected logger: Logger,
    protected config: HeadlessScraperConfig
  ) {
    this.app = express();
    this.config = config;
    this.logger = logger;
    this.app.disable("x-powered-by");
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(helmet());
  }

  async start(): Promise<void> {
    try {
      const http = this.app.listen(this.config.app.port, () => {
        this.logger.info(`✅ Server started at port ${this.config.app.port}!`);
      });
      http.on("close", () => {
        container.dispose();
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
