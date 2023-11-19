import {Injectable} from '@nestjs/common';
import {SignUpDTO} from "../dto/signUp.dto";
import {randomUUID} from "crypto"
import {User} from "../models/user.model";
import {InjectModel} from "@nestjs/sequelize";
import * as bcrypt from 'bcrypt';
import {UserWithoutPasswordType} from "../types/userWithoutPassword.type";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {
  }

  async findOneById(id: string) {
    return await this.userModel.findOne({
      where: {
        id,
      }
    })
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({
      where: {
        email,
      }
    })
  }

  async addUser(user: SignUpDTO) {
    const {email, password, userInfo} = user;

    const refreshTokenVersion = randomUUID();
    const passwordHash = await bcrypt.hash(password, 10);

    return await this.userModel.create({
      email,
      passwordHash,
      userInfo,
      refreshTokenVersion,
    })
  }

  async getUserInfo(token): Promise<UserWithoutPasswordType> {
    const user = await this.userModel.findOne({
      where: {
        id: token.userId,
      }
    })

    const resultUser: UserWithoutPasswordType = {
      email: user.email,
      id: user.id,
      userInfo: user.userInfo,
    }
    return resultUser
  }
}
