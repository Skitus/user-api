import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'config/configuration';
import dbConfig from 'config/db.config';
import { DatabaseConfig } from 'config/interfaces';
import { AuthModule } from 'module/auth.module';
import { UserModule } from 'module/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRoot(dbConfig() as DatabaseConfig),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
