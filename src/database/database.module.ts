import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import mongoose from 'mongoose';

const databaseProviders = [
  {
    provide: 'MONGO_CONNECTION',
    inject: [ConfigService],
    useFactory: async (
      configService: ConfigService,
    ): Promise<typeof mongoose> => {
      const server = configService.get<string>('mongo.host');
      const port = configService.get<number>('mongo.port');
      const database = configService.get<string>('mongo.dbname');
      const username = configService.get<string>('mongo.username');
      const password = configService.get<string>('mongo.password') ?? '';

      const mongoUrl = `mongodb://${username}:${encodeURIComponent(password)}@${server}:${port}/${database}?authSource=admin`;
      return mongoose.connect(mongoUrl);
    },
  },
];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('postgres.host'),
        port: +configService.get('postgres.port'),
        username: configService.get('postgres.username'),
        password: configService.get('postgres.password'),
        database: configService.get('postgres.dbname'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
  ],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
