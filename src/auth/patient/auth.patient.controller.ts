import { Body, Controller, HttpCode, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import { SignInDto } from '../dto/sign-in.dto';
import { Response } from 'express';
import { CookieGetter } from '../../common/decorators/cookie-getter.decorator';
import { AuthPatientService } from './auth.patient.service';
import { CreatePatientDto } from '../../patients/dto/create-patient.dto';
@Controller('auth_patient')
export class AuthPatientController {
  constructor(private readonly authPatientService:AuthPatientService) {}

  @Post("sign-up-patient")
  async signUp(@Body() createPatientDto: CreatePatientDto) {
    return this.authPatientService.singUpPatient(createPatientDto)
  }
  
  @Post("sign-in-patient")
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({passthrough: true}) res: Response
  ) {
    return this.authPatientService.signInPatient(signInDto, res)
  }

  @Post("sign-out-patient")
  signOut(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authPatientService.signOutPatien(refreshToken, res);
  }


  @Post("refresh-token-patient")
  async refreshToken(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authPatientService.refreshTokenPatient(refreshToken, res);
  }

}
