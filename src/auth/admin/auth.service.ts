import { CreateAdminDto } from '../../admin/dto/create-admin.dto';
import { Admin } from '../../admin/models/admin.model';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../../admin/admin.service';
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from '../dto/sign-in.dto';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly adminService:AdminService,
        private readonly jwtService:JwtService) {}

    async generateTokenAdmin(admin:Admin){
        const payload = {
            id:admin.id,
            is_active:admin.is_active,
            email:admin.email,
            role:admin.role
        }
        const [adminAccessToken , adminRefreshToken] = await Promise.all([
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
        adminAccessToken,
        adminRefreshToken
        }
    }


async singUpAdmin(createAdminDto: CreateAdminDto) {
    const candidate = await this.adminService.findAdminByEmail(
      createAdminDto.email
    );
    if (candidate) {
    //   console.log(candidate);
      throw new ConflictException({
        message: "Bunday Email foyalnuvchi mavjud",
      });
    }
    const newAdmin = await this.adminService.create(createAdminDto);
    return { message: "Foydalanuvchi qo'shildi", userId: newAdmin.id };
    }


  async signInAdmin(signInDto: SignInDto, res: Response) {
    const admin = await this.adminService.findAdminByEmail(signInDto.email);
    if(!admin) {
      throw new BadRequestException("Email yoki Password noto'g'ri")
    }
    if(!admin.is_active){
      throw new BadRequestException("EAvval Emailni tasdiqlang")

    }
    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      admin.password_hash
    );
    if (!isValidPassword) {
      throw new BadRequestException("Email yoki Password noto'g'ri")
    }
    const {adminAccessToken, adminRefreshToken} = await this.generateTokenAdmin(admin);
    res.cookie("refresh_token", adminRefreshToken, {
      httpOnly: true, 
      maxAge: Number(process.env.COOKIE_TIME),
    });
    admin.hashed_refresh_token = await bcrypt.hash(adminRefreshToken, 7);
    await admin.save();
    return {
      message: "Tizimga xush kelibsiz",
      adminAccessToken,
    }
  }

async signOutAdmin(refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if(!adminData) {
      throw new ForbiddenException("Admin not verified");
    }

    const hashed_refresh_token = null;
    await this.adminService.updateAdmin(
      adminData.id,
      hashed_refresh_token!
    );

    res.clearCookie("refresh_token");
    const response = {
      message: "Admin logged out succesfully",
    };
    return response
  }

  async refreshTokenAdmin(refresh_token: string, res: Response) {
    try {
      const admin = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      console.log("Admin1");
      const adminData = await this.adminService.findOne(admin.id);

      if (!adminData) {
        throw new BadRequestException("Bunday tokenli foydalanuvchi topilmadi");
      }
      const tokens = await this.generateTokenAdmin(adminData);

      adminData.hashed_refresh_token = await bcrypt.hash(tokens.adminRefreshToken, 7);
      await adminData.save();

      res.cookie("refresh_token", tokens.adminRefreshToken, {
        httpOnly: true,
        maxAge: Number(process.env.COOKIE_TIME),
      });
      return res.send({
        message: "Tokenlar yangilandi",
        accessToken: tokens.adminAccessToken,
      });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException("Tokenni yangilashda xatolik yuz berdi");
    }
  }
}
