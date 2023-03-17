import { LogFn, LogLevel } from '@chubbyts/chubbyts-log-types/dist/log';
import { Logger, Level } from 'pino';

export const createPinoAdapter = (pino: Logger): LogFn => {
  return (level: LogLevel, message: string, context: Record<string, unknown>): void => {
    let pinoLevel: Level = 'fatal';

    switch (level) {
      case LogLevel.DEBUG:
        pinoLevel = 'debug';
        break;
      case LogLevel.INFO:
        pinoLevel = 'info';
        break;
      case LogLevel.NOTICE:
      case LogLevel.WARNING:
        pinoLevel = 'warn';
        break;
      case LogLevel.ERROR:
        pinoLevel = 'error';
        break;
    }

    pino[pinoLevel](context, message);
  };
};
