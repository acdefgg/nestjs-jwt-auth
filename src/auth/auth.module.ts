import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UserService} from "../user/user.service";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from '@nestjs/config';
import * as fs from 'fs';
import {CacheModule} from "@nestjs/cache-manager";
import {redisStore} from 'cache-manager-redis-yet';
import {RedisClientOptions} from 'redis';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../models/user.model";

@Module({
  exports: [JwtModule],
  providers: [AuthService, UserService],
  controllers: [AuthController],
  imports: [
    SequelizeModule.forFeature([User]),
    ConfigModule.forRoot(),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: +process.env.REDIS_PORT || 6379,
      }
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const privateKeyPath = configService.get<string>('JWT_PRIVATE_KEY');
        const publicKeyPath = configService.get<string>('JWT_PUBLIC_KEY');

        const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
        const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

        return {
          privateKey,
          publicKey,
          signOptions: {algorithm: 'RS256'},
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {
}
