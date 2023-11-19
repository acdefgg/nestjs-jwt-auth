import {Controller, Post, Body} from '@nestjs/common';
import {SignUpDTO} from "../dto/signUp.dto";
import {AuthService} from "./auth.service";
import {SignInDTO} from "../dto/signIn.dto";
import {TokensType} from "../types/tokens.type";
import {RefreshTokenDTO} from "../dto/refreshToken.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDTO): Promise<TokensType> {
    return this.authService.signUp(dto)
  }

  @Post('sign-in')
  async signIn(@Body() dto: SignInDTO): Promise<TokensType> {
    return this.authService.signIn(dto)
  }

  @Post('refresh-token')
  async refreshToken(@Body() token: RefreshTokenDTO): Promise<TokensType> {
    return this.authService.refreshToken(token)
  }

  @Post('sign-out')
  async signOut(@Body() token: RefreshTokenDTO): Promise<boolean> {
    return this.authService.signOut(token)
  }
}
