import { describe, expect, test } from 'vitest';
import type { Logger } from 'pino';
import type { LogLevel } from '@chubbyts/chubbyts-log-types/dist/log';
import { useObjectMock } from '@chubbyts/chubbyts-function-mock/dist/object-mock';
import { createPinoAdapter } from '../src/pino-adapter';

describe('createPinoAdapter', () => {
  const data: Array<{ level: LogLevel; pinoLevel: string }> = [
    { level: 'emergency', pinoLevel: 'fatal' },
    { level: 'alert', pinoLevel: 'fatal' },
    { level: 'critical', pinoLevel: 'fatal' },
    { level: 'error', pinoLevel: 'error' },
    { level: 'warning', pinoLevel: 'warn' },
    { level: 'notice', pinoLevel: 'warn' },
    { level: 'info', pinoLevel: 'info' },
    { level: 'debug', pinoLevel: 'debug' },
  ];

  data.forEach(({ level, pinoLevel }) => {
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
