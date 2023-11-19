import {IsJWT} from "class-validator";

export class RefreshTokenDTO {
  @IsJWT()
  refresh_token: string;
}