import { LogFn, LogLevel } from '@chubbyts/chubbyts-log-types/dist/log';
import { Logger } from 'pino';

export const createPinoAdapter = (pino: Logger): LogFn => {
  return (level: LogLevel, message: string, context: Record<string, unknown>): void => {
    if (level === LogLevel.DEBUG) {
      pino.debug(context, message);

      return;
    }

    if (level === LogLevel.INFO) {
      pino.info(context, message);

      return;
    }

    if (level === LogLevel.NOTICE || level === LogLevel.WARNING) {
      pino.warn(context, message);

      return;
    }

    if (level === LogLevel.ERROR) {
      pino.error(context, message);

      return;
    }

    pino.fatal(context, message);
  };
};
