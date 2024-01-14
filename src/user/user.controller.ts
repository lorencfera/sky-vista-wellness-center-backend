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


  @UseGuards(AuthGuard('jwt'))
  @Post('JobSaves/:postId')
  async PostJob(
    @Param('postId') JobSaveId: string,
    @Res() res: Response,
    @Request() req,
  ) {
    try {
      const result = await this.UserService.JobSave(req.user.id,JobSaveId);
      res.status(201).json(result);
      console.log(result)
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('JobSaves/:userId')
  async GetJob(@Param('userId') userId: string) {
    return this.UserService.getjob(userId);
}

}
