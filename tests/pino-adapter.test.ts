import { describe, expect, test } from 'vitest';
import type { Logger } from 'pino';
import { LogLevel } from '@chubbyts/chubbyts-log-types/dist/log';
import { useObjectMock } from '@chubbyts/chubbyts-function-mock/dist/object-mock';
import { createPinoAdapter } from '../src/pino-adapter';

describe('createPinoAdapter', () => {
  [
    { level: LogLevel.EMERGENCY, pinoLevel: 'fatal' },
    { level: LogLevel.ALERT, pinoLevel: 'fatal' },
    { level: LogLevel.CRITICAL, pinoLevel: 'fatal' },
    { level: LogLevel.ERROR, pinoLevel: 'error' },
    { level: LogLevel.WARNING, pinoLevel: 'warn' },
    { level: LogLevel.NOTICE, pinoLevel: 'warn' },
    { level: LogLevel.INFO, pinoLevel: 'info' },
    { level: LogLevel.DEBUG, pinoLevel: 'debug' },
  ].forEach(({ level, pinoLevel }) => {
    test('level is ' + level + ', pinoLevel is ' + pinoLevel, () => {
      const context = { key: 'value' };
      const message = 'message';

      const [pino, pinoMocks] = useObjectMock<Logger>([
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        { name: pinoLevel, parameters: [context, message], return: undefined },
      ]);

      const pinoAdapter = createPinoAdapter(pino);

      pinoAdapter(level, message, context);

      expect(pinoMocks.length).toBe(0);
    });
  });
});
