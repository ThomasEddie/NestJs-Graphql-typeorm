import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      debug: true,
      playground: true,
      fieldResolverEnhancers: ['interceptors'],
    }),
  ],
})
export class GrqhpqlModule {}
