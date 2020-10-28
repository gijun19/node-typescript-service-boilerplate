import { container } from "./container";
import { Application } from "./core/infra/http/Application";

const app = container.resolve<Application>("app");

app.start();
