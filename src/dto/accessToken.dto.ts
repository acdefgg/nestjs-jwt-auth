import {IsJWT} from "class-validator";

export class AccessTokenDTO {
  @IsJWT()
  access_token: string;
}