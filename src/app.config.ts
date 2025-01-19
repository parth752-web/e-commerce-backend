import { Params } from 'nestjs-pino';
import { pid } from 'process';
import { LogLevel, NodeEnv } from './shared/enums';
import { IncomingMessage } from 'http';
import { ServerResponse } from 'http';

export class AppConfig {
  public static getLoggerConfig(): Params {
    const { NODE_ENV, LOG_LEVEL, CLUSTERING } = process.env;

    return {
      exclude: [],
      pinoHttp: {
        genReqId: () => crypto.randomUUID(),
        autoLogging: true,
        base: CLUSTERING === 'true' ? { pid: process.pid } : {},
        customAttributeKeys: {
          responseTime: 'timeSpent',
        },
        level: LOG_LEVEL || (NODE_ENV === NodeEnv.PRODUCTION ? LogLevel.INFO : LogLevel.TRACE),
        serializers: {
          req(request: IncomingMessage) {
            return {
              method: request.method,
              url: request.url,
              id: request.id,
            };
          },
          res(reply: ServerResponse) {
            return {
              statusCode: reply.statusCode,
            };
          },
        },
        transport:
          NODE_ENV !== NodeEnv.PRODUCTION
            ? {
                target: 'pino-pretty',
                options: {
                  translateTime: 'SYS:yyyy-mm-dd HH:MM:SS',
                },
              }
            : null,
      },
    };
  }
}
