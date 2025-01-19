import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './config';
import { LoggerModule } from 'nestjs-pino';
import { AppConfig } from './app.config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { ValidationError } from 'class-validator';
import { ValidationExceptionFilter } from './filters/validator-exception.filter';
import { BadRequestExceptionFilter } from './filters/bad-request-exception.filter';
import { UnauthorizedExceptionFilter } from './filters/unauthorized-exception.filter';
import { ForbiddenExceptionFilter } from './filters/forbidden-exception.filter';
import { NotFoundExceptionFilter } from './filters/not-found.exception.filter';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { AccessModule } from './modules/access/access.module';

@Module({
  // configure environment variables
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // make the configuration global
      load: [configuration], // load the environment variables from the configuration file
    }),

    // Configure logging
    LoggerModule.forRoot(AppConfig.getLoggerConfig()),

    // Configure mongoose
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('database.uri'),
      }),
    }),

    AuthModule,

    UserModule,

    WorkspaceModule,

    AccessModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_FILTER, useClass: ValidationExceptionFilter },
    { provide: APP_FILTER, useClass: BadRequestExceptionFilter },
    { provide: APP_FILTER, useClass: UnauthorizedExceptionFilter },
    { provide: APP_FILTER, useClass: ForbiddenExceptionFilter },
    { provide: APP_FILTER, useClass: NotFoundExceptionFilter },
    {
      provide: APP_PIPE,
      useFactory: () => {
        new ValidationPipe({
          exceptionFactory: (errors: ValidationError[]) => {
            return errors[0];
          },
        });
      },
    },
  ],
})
export class AppModule {}
