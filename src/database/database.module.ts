import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';

const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [ConfigService],
    useFactory: async (
      configService: ConfigService,
    ): Promise<typeof mongoose> => {
      const server = configService.get<string>('database.host');
      const port = configService.get<number>('database.port');
      const database = configService.get<string>('database.dbname');
      const username = configService.get<string>('database.username');
      const password = configService.get<string>('database.password') ?? '';

      const mongoUrl = `mongodb://${username}:${encodeURIComponent(password)}@${server}:${port}/${database}?authSource=admin`;
      return mongoose.connect(mongoUrl);
    },
  },
];

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
