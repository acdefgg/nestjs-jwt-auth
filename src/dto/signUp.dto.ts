import {IsString, Length} from 'class-validator'
import {SignInDTO} from "./signIn.dto";

export class SignUpDTO extends SignInDTO {
  @IsString()
  @Length(3,128)
  userInfo: string;
}
