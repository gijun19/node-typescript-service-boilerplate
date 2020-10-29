import * as winston from "winston";

const makeLogger = (options: winston.LoggerOptions = {}): winston.Logger => {
  const transports = makeTransports();
  const logger = winston.createLogger(<winston.LoggerOptions>{
    transports,
    handleExceptions: true,
    exitOnError: false,
    level: "debug",
    ...options,
  });
  return logger;
};

const formatters = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  winston.format.errors({ stack: true }),
  winston.format.printf((info) => {
    if (info.method && info.url) {
      return `[${info.timestamp}] http: ${info.method} ${info.url}`;
    }
    if (typeof info.message === "object") {
      return `[${info.timestamp}] ${info.level}: ${JSON.stringify(
        info.message,
        undefined,
        2
      )}`;
    }
    return `[${info.timestamp}] ${info.level}: ${info.message}`;
  })
);

const makeTransports = () => {
  return [
    new winston.transports.Console({
      format: formatters,
    }),
  ];
};

export { makeLogger };
