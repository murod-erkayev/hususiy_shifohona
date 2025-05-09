import { DoctorsService } from './../../doctors/doctors.service';
import { CreateDoctorDto } from './../../doctors/dto/create-doctor.dto';
import { Doctor } from './../../doctors/models/doctor.entity';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from '../dto/sign-in.dto';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthDoctrService {
    constructor(
        private readonly doctorsService:DoctorsService,
        private readonly jwtService:JwtService) {}

    async generateTokenDoctor(doctor:Doctor){
        const payload = {
            id:doctor.id,
            is_active:doctor.is_active,
            email:doctor.email,
            role:doctor.role
        }
        const [doctorAccessToken , doctorRefreshToken] = await Promise.all([
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
        doctorAccessToken,
        doctorRefreshToken
        }
    }

async singUpDoctor(createDoctorDto: CreateDoctorDto) {
    const candidate = await this.doctorsService.findDoctorByEmail(
      createDoctorDto.email
    );    
    if (candidate) {
    //   console.log(candidate);
      throw new ConflictException({
        message: "Bunday Email foyalnuvchi mavjud",
      });
    }
    const newDoctor = await this.doctorsService.create(createDoctorDto);
    return { message: "Foydalanuvchi qo'shildi", userId: newDoctor.id };
    }

  async signInDoctor(signInDto: SignInDto, res: Response) {
    const doctor = await this.doctorsService.findDoctorByEmail(signInDto.email);
    if(!doctor) {
      throw new BadRequestException("Email yoki Password noto'g'ri")
    }
    if(!doctor.is_active){
      throw new BadRequestException("Eavval Emailni tasdiqlang")

    }
    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      doctor.password_hash
    );
    if (!isValidPassword) {
      throw new BadRequestException("Email yoki Password noto'g'ri")
    }
    const {doctorAccessToken, doctorRefreshToken} = await this.generateTokenDoctor(doctor);
    res.cookie("refresh_token", doctorAccessToken, {
      httpOnly: true, 
      maxAge: Number(process.env.COOKIE_TIME),
    });
    doctor.hashed_refresh_token = await bcrypt.hash(doctorRefreshToken, 7);
    await doctor.save();
    return {
      message: "Tizimga xush kelibsiz",
      doctorAccessToken,
    }
  }

async signOutDoctor(refreshToken: string, res: Response) {
    const doctorData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if(!doctorData) {
      throw new ForbiddenException("Admin not verified");
    }

    const hashed_refresh_token = null;
    await this.doctorsService.updateAdmin(
      doctorData.id,
      hashed_refresh_token!
    );

    res.clearCookie("refresh_token");
    const response = {
      message: "Doctor logged out succesfully",
    };
    return response
  }

  async refreshTokenDoctor(refresh_token: string, res: Response) {
    try {
      const admin = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      console.log("Admin1");
      const adminData = await this.doctorsService.findOne(admin.id);

      if (!adminData) {
        throw new BadRequestException("Bunday tokenli foydalanuvchi topilmadi");
      }
      const tokens = await this.generateTokenDoctor (adminData);

      adminData.hashed_refresh_token = await bcrypt.hash(tokens.doctorRefreshToken, 7);
      await adminData.save();

      res.cookie("refresh_token", tokens.doctorRefreshToken, {
        httpOnly: true,
        maxAge: Number(process.env.COOKIE_TIME),
      });
      return res.send({
        message: "Tokenlar yangilandi",
        accessToken: tokens.doctorAccessToken,
      });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException("Tokenni yangilashda xatolik yuz berdi");
    }
  }
}
