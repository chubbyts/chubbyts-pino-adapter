import type { LogFn, LogLevel } from '@chubbyts/chubbyts-log-types/dist/log';
import type { Logger } from 'pino';

export const createPinoAdapter = (pino: Logger): LogFn => {
  return (level: LogLevel, message: string, context: Record<string, unknown>): void => {
    switch (level) {
      case 'debug':
        return pino.debug(context, message);
      case 'info':
        return pino.info(context, message);
      case 'notice':
      case 'warning':
        return pino.warn(context, message);
      case 'error':
        return pino.error(context, message);
    }

    return pino.fatal(context, message);
  };
};
