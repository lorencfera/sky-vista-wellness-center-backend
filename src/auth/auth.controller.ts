import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import * as path from 'path';
import { User } from '../Schema/auth.schema';
import { AuthUserDto } from '../user/dtoss/auth.user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { UpdateUserDto } from 'src/user/dtoss/update.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  regsiterUser(@Body() user: AuthUserDto): Promise<User> {
    return this.userService.registrationofUser(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    try {
      const response = await this.authService.login(req.user);
      return res.status(201).json(response);
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('whoami')
  async getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update')
  async updateUser(
    @Request() req,
    @Res() res: Response,
    @Body() user: UpdateUserDto
  ) {
    try {
      const updatedUser = await this.userService.updateUser(req.user.id, user);
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

}
