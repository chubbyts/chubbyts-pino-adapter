import { describe, expect, test } from '@jest/globals';
import { createPinoAdapter } from '../src/pino-adapter';
import { Logger } from 'pino';
import { LogLevel } from '@chubbyts/chubbyts-log-types/dist/log';

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

      const logFn = jest.fn((givenContext: Record<string, unknown>, givenMessage: string) => {
        expect(givenContext).toBe(context);
        expect(givenMessage).toBe(message);
      });

      const pino = {
        [pinoLevel]: logFn,
      } as unknown as Logger;

      const pinoAdapter = createPinoAdapter(pino);

      pinoAdapter(level, message, context);

      expect(logFn).toHaveBeenCalledTimes(1);
    });
  });
});
