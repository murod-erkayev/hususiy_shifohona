import { Body, Controller, HttpCode, Param, ParseIntPipe, Post, Res, UseGuards } from '@nestjs/common';
import { SignInDto } from '../dto/sign-in.dto';
import { Response } from 'express';
import { CookieGetter } from '../../common/decorators/cookie-getter.decorator';
import { CreateDoctorDto } from '../../doctors/dto/create-doctor.dto';
import { AuthDoctrService } from './auth.doctor.service';
import { JwtAuthGuard } from '../../common/guards/user.guard';
import { RolesGuard } from '../../common/guards/role.guard';
import { Roles } from '../../common/decorators/role.decorator';

@Controller('auth_Admin')
export class AuthDoctorController {
  constructor(private readonly authDoctrService:AuthDoctrService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin")
  @Post("sign-up-doctor")
  async signUp(@Body() createDoctorDto: CreateDoctorDto) {
    return this.authDoctrService.singUpDoctor(createDoctorDto)
  }
  
  @Post("sign-in-doctor")
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({passthrough: true}) res: Response
  ) {
    return this.authDoctrService.signInDoctor(signInDto, res)
  }

  @Post("sign-out-doctor")
  signOut(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authDoctrService.signOutDoctor(refreshToken, res);
  }


  @Post("refresh-token-doctor")
  async refreshToken(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authDoctrService.refreshTokenDoctor(refreshToken, res);
  }

}
