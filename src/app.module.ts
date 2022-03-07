import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DepartmentsModule } from './modules/departments/departments.module';
import { PositionsModule } from './modules/positions/positions.module';
import { UsersModule } from './modules/users/users.module';
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './config/typeOrm.config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver
    }),
    TypeOrmModule.forRootAsync(ormConfig),
    UsersModule, DepartmentsModule, PositionsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
