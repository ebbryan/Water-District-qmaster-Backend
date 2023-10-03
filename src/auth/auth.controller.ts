import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() signInDto: Record<string, any>,
  ) {
    const result = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    const accessToken = result.accessToken;

    response.cookie('accessToken', accessToken, {
      secure: false,
      httpOnly: true,
      sameSite: 'strict',
    });

    return result;
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
