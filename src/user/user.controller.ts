import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {AccessTokenDTO} from "../dto/accessToken.dto";
import {UserService} from "./user.service";
import {AuthGuard} from "../auth/auth.guard";
import {UserWithoutPasswordType} from "../types/userWithoutPassword.type";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }
  @UseGuards(AuthGuard)
  @Post('me')
  async getUserInfo(@Body() token: AccessTokenDTO): Promise<UserWithoutPasswordType>{
    return this.userService.getUserInfo(token);
  }
}
