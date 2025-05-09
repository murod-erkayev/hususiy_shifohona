
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from '../dto/sign-in.dto';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { PatientsService } from '../../patients/patients.service';
import { JwtService } from '@nestjs/jwt';
import { Patient } from '../../patients/models/patient.model';
import { CreatePatientDto } from '../../patients/dto/create-patient.dto';

@Injectable()
export class AuthPatientService {
    constructor(
        private readonly patientsService:PatientsService,
        private readonly jwtService:JwtService) {}

    async generateTokenPatient(patient:Patient){
        const payload = {
            id:patient.id,
            is_active:patient.is_active,
            email:patient.email,
            role:patient.role
        }
        const [patientAccessToken , patientRefreshToken] = await Promise.all([
        this.jwtService.signAsync(payload, {
          secret: process.env.ACCESS_TOKEN_KEY,
          expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
        ])
    return {
        patientAccessToken,
        patientRefreshToken
        }
    }

async singUpPatient(createPatientDto: CreatePatientDto) {
    const candidate = await this.patientsService.findPatientByEmail(
      createPatientDto.email
    );    
    if (candidate) {
      throw new ConflictException({
        message: "Bunday Email foyalnuvchi mavjud",
      });
    }
    const newPatient = await this.patientsService.create(createPatientDto);
    return { message: "Foydalanuvchi qo'shildi", userId: newPatient.id };
    }

  async signInPatient(signInDto: SignInDto, res: Response) {
    const patient = await this.patientsService.findPatientByEmail(signInDto.email);
    if(!patient) {
      throw new BadRequestException("Email yoki Password noto'g'ri")
    }
    if(!patient.is_active){
      throw new BadRequestException("Eavval Emailni tasdiqlang")

    }
    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      patient.password_hash
    );
    if (!isValidPassword) {
      throw new BadRequestException("Email yoki Password noto'g'ri")
    }
    const {patientAccessToken, patientRefreshToken} = await this.generateTokenPatient(patient);
    res.cookie("refresh_token", patientRefreshToken, {
      httpOnly: true, 
      maxAge: Number(process.env.COOKIE_TIME) ,
    });
    patient.hashed_refresh_token = await bcrypt.hash(patientRefreshToken, 7);
    await patient.save();
    return {
      message: "Tizimga xush kelibsiz",
      patientAccessToken,
    }
  }
async signOutPatien(refreshToken:string, res: Response) {
  console.log(refreshToken);
    const patientData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY
    });
    if(!patientData) {
      throw new ForbiddenException("Patient not verified");
    }
    const patientId = await this.patientsService.findOne(patientData.id)
    if(!patientId){
      throw new BadRequestException({message:"Bunday Malumot topilmadi"})
    }
    patientId.hashed_refresh_token = ""
    patientId.save()
    res.clearCookie("refresh_token");
    const response ={
      message: "Patient logged out succesfully",
    };
    return response
  }


  async refreshTokenPatient(refresh_token: string, res: Response) {
    try {
      const patient = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      const patientData = await this.patientsService.findOne(patient.id);

      if (!patientData) {
        throw new BadRequestException("Bunday tokenli foydalanuvchi topilmadi");
      }
      const tokens = await this.generateTokenPatient (patientData);

      patientData.hashed_refresh_token = await bcrypt.hash(tokens.patientRefreshToken, 7);
      await patientData.save();

      res.cookie("refresh_token", tokens.patientRefreshToken, {
        httpOnly: true,
        maxAge: Number(process.env.COOKIE_TIME),
      });
      return res.send({
        message: "Tokenlar yangilandi",
        accessToken: tokens.patientAccessToken,
      });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException("Tokenni yangilashda xatolik yuz berdi");
    }
  }
}
