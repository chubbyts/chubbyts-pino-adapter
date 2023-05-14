import type { LogFn } from '@chubbyts/chubbyts-log-types/dist/log';
import { LogLevel } from '@chubbyts/chubbyts-log-types/dist/log';
import type { Logger } from 'pino';

export const createPinoAdapter = (pino: Logger): LogFn => {
  return (level: LogLevel, message: string, context: Record<string, unknown>): void => {
    switch (level) {
      case LogLevel.DEBUG:
        return pino.debug(context, message);
      case LogLevel.INFO:
        return pino.info(context, message);
      case LogLevel.NOTICE:
      case LogLevel.WARNING:
        return pino.warn(context, message);
      case LogLevel.ERROR:
        return pino.error(context, message);
    }

    return pino.fatal(context, message);
  };
};
