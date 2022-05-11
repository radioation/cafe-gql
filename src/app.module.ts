import { Module } from '@nestjs/common';

// GraphQL 
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

// App Configuration
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

// Database
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenusModule } from './menus/menus.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),

    TypeOrmModule.forRootAsync({
      imports:[ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: async ( configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get( 'DB_HOST' ),
          port: configService.get( 'DB_PORT' ),
          username: configService.get( 'DB_USERNAME' ),
          password: configService.get( 'DB_PASSWORD' ),
          database: configService.get( 'DB_DATABASE' ),
          entities: ['dist/**/*.model.js'],
          synchronize: true,
        }
      },
    }),

    MenusModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
