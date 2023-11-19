import {Inject, Injectable, ConflictException, UnauthorizedException} from '@nestjs/common';
import {UserService} from '../user/user.service';
import {JwtService} from '@nestjs/jwt';
import {SignInDTO} from '../dto/signIn.dto';
import {SignUpDTO} from '../dto/signUp.dto';
import {TokensType} from '../types/tokens.type';
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from "cache-manager";
import {ConfigService} from "@nestjs/config";
import * as bcrypt from "bcrypt";


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {
  }

  async signIn(dto: SignInDTO) {
    const {email, password} = dto;
    const user = await this.userService.findOneByEmail(email);
    const isMatch = user ? await bcrypt.compare(password, user.passwordHash) : false;

    if (!isMatch || !user) {
      throw new UnauthorizedException("Wrong password or email!");
    }
    return await this.generateTokens(user.id, user.email, user.refreshTokenVersion);
  }

  async signUp(dto: SignUpDTO): Promise<TokensType> {
    const {email, password} = dto;
    const isUser = await this.userService.findOneByEmail(email);
    if (isUser) {
      throw new ConflictException();
    }
    const user = await this.userService.addUser(dto);
    return await this.generateTokens(user.id, email, user.refreshTokenVersion);
  }

  async signOut(token) {
    try {
      await this.jwtService.verifyAsync(token.refresh_token)
      await this.cacheManager.del(token.refresh_token)
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  async refreshToken(token) {
    try {
      const payload = await this.jwtService.verifyAsync(token.refresh_token);
      const user = await this.userService.findOneById(payload.sub)
      const cachedRefreshTokenVersion = await this.cacheManager.get(token.refresh_token);
      if (user.refreshTokenVersion !== cachedRefreshTokenVersion || payload.token_type !== 'refresh') {
        throw new UnauthorizedException();
      }
      await this.cacheManager.del(token.refresh_token)

      return await this.generateTokens(user.id, user.email, user.refreshTokenVersion);
    } catch {
      throw new UnauthorizedException();
    }
  }

  async generateTokens(userId, email, refreshTokenVersion): Promise<TokensType> {
    const payload = {
      sub: userId,
      email: email,
    }
    const tokens = {
      access_token: await this.jwtService.signAsync({...payload, token_type: "access"}, {
        expiresIn: +this.configService.get('JWT_ACCESS_LIFETIME'),
      }),
      refresh_token: await this.jwtService.signAsync({...payload, token_type: "refresh"}, {
        expiresIn: +this.configService.get('JWT_REFRESH_LIFETIME'),
      }),
    }
    await this.cacheManager.set(tokens.refresh_token, refreshTokenVersion, 1000 * this.configService.get('JWT_REFRESH_LIFETIME'));
    return tokens;
  }
}
