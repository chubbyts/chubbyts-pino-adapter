# chubbyts-pino-adapter

[![CI](https://github.com/chubbyts/chubbyts-pino-adapter/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/chubbyts/chubbyts-pino-adapter/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/chubbyts/chubbyts-pino-adapter/badge.svg?branch=master)](https://coveralls.io/github/chubbyts/chubbyts-pino-adapter?branch=master)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fchubbyts%2Fchubbyts-pino-adapter%2Fmaster)](https://dashboard.stryker-mutator.io/reports/github.com/chubbyts/chubbyts-pino-adapter/master)
[![npm-version](https://img.shields.io/npm/v/@chubbyts/chubbyts-pino-adapter.svg)](https://www.npmjs.com/package/@chubbyts/chubbyts-pino-adapter)

[![bugs](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-pino-adapter&metric=bugs)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-pino-adapter)
[![code_smells](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-pino-adapter&metric=code_smells)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-pino-adapter)
[![coverage](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-pino-adapter&metric=coverage)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-pino-adapter)
[![duplicated_lines_density](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-pino-adapter&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-pino-adapter)
[![ncloc](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-pino-adapter&metric=ncloc)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-pino-adapter)
[![sqale_rating](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-pino-adapter&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-pino-adapter)
[![alert_status](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-pino-adapter&metric=alert_status)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-pino-adapter)
[![reliability_rating](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-pino-adapter&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-pino-adapter)
[![security_rating](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-pino-adapter&metric=security_rating)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-pino-adapter)
[![sqale_index](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-pino-adapter&metric=sqale_index)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-pino-adapter)
[![vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=chubbyts_chubbyts-pino-adapter&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=chubbyts_chubbyts-pino-adapter)

## Description

[Pino][4] adapter for [@chubbyts/chubbyts-log-types][3], [PSR-3][2] inspired.

`createPinoAdapter` turns a pino `Logger` into a `LogFn`, so you can use pino behind the `Logger` from
`@chubbyts/chubbyts-log-types`. It maps the eight PSR-3 log levels to pino's levels.

### Why use it

 * **Decoupled**: your code depends on the small `Logger` / `LogFn` types, not on pino, so you can swap the logger
   implementation without touching it.
 * **Full PSR-3 level set**: `emergency`, `alert`, `critical`, `error`, `warning`, `notice`, `info` and `debug` are all
   supported, even though pino has fewer levels.
 * **Structured logging**: the context object is passed to pino as merge object, so its keys end up as fields in the
   JSON log line.
 * **Tiny**: a single function. You configure pino yourself (transports, redaction, serializers, …).

## Requirements

 * node: >= 22
 * [@chubbyts/chubbyts-log-types][3]: ^3.4.0
 * [pino][4]: ^10.4.0

## Installation

Through [NPM](https://www.npmjs.com) as [@chubbyts/chubbyts-pino-adapter][1].

```sh
npm i @chubbyts/chubbyts-pino-adapter@^3.4.1
```

## Usage

```ts
import { pino } from 'pino';
import { createLogger } from '@chubbyts/chubbyts-log-types/log';
import { createPinoAdapter } from '@chubbyts/chubbyts-pino-adapter/pino-adapter';

const logger = createLogger(createPinoAdapter(pino({ level: 'debug' })));

logger.info('User logged in', { userId: 'b1c3e5f7' });
// {"level":30,"time":...,"pid":...,"hostname":"...","userId":"b1c3e5f7","msg":"User logged in"}
```

You can also call the `LogFn` directly:

```ts
const log = createPinoAdapter(pino());

log('warning', 'Disk space low', { free: '512MB' });
```

## Level mapping

| PSR-3 level | pino level |
| ----------- | ---------- |
| `emergency` | `fatal`    |
| `alert`     | `fatal`    |
| `critical`  | `fatal`    |
| `error`     | `error`    |
| `warning`   | `warn`     |
| `notice`    | `warn`     |
| `info`      | `info`     |
| `debug`     | `debug`    |

 * pino's default minimum level is `info`, so `debug` messages are only written if you create pino with
   `level: 'debug'` (or lower).
 * pino's `trace` level is not used.

## Copyright

2026 Dominik Zogg

[1]: https://www.npmjs.com/package/@chubbyts/chubbyts-pino-adapter
[2]: https://www.php-fig.org/psr/PSR-3
[3]: https://www.npmjs.com/package/@chubbyts/chubbyts-log-types
[4]: https://www.npmjs.com/package/pino
