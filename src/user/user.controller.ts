import { Controller, Get, Res, UseFilters, UseGuards,Request, Param, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Response } from 'express'
@Controller('user')
export class UserController {
    constructor(private UserService: UserService){}
    @UseGuards(AuthGuard('jwt'))
    @Get('prolife/:userId') 
    async GettingNiggaUser(@Request() req, @Res() res: Response, 
    @Param('userId') userId: string ) { 
        try { 
        const found = await this.UserService.findById(userId)
        res.status(200).json(found)
        } catch(error){ 
            res.status(500).json({message: error.message})
        }
        
    }

}
