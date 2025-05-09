import { Body, Controller, HttpCode, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import { SignInDto } from '../dto/sign-in.dto';
import { Response } from 'express';
import { CreateAdminDto } from '../../admin/dto/create-admin.dto';
import { AuthService } from './auth.service';
import { CookieGetter } from '../../common/decorators/cookie-getter.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  async signUp(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.singUpAdmin(createAdminDto)
  }
  
  @Post("sign-in")
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({passthrough: true}) res: Response
  ) {
    return this.authService.signInAdmin(signInDto, res)
  }

  @Post("sign-out")
  signOut(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutAdmin(refreshToken, res);
  }


  @Post("refresh-token")
  async refreshToken(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenAdmin(refreshToken, res);
  }

}
