import { Body, Controller, Post, Res, UseGuards,Request, Get, Param } from "@nestjs/common";
import { PostService } from "./postj.service";
import { UserService } from "src/user/user.service";
import { AuthGuard } from "@nestjs/passport";
import { CreateJob } from "./dtos/postjob.dtos";
import { Response } from 'express';

@Controller('post')
export class PostController {
  constructor(
    private postService: PostService,
    private userService: UserService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPost(
    @Res() res: Response,
    @Request() req,
    @Body() post: CreateJob,
  ) {
    try {
      const newPost = await this.postService.createPost(req.user.id, post);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:postId')
  async getPost(@Res() res: Response, @Param('postId') postId: string) {
    try {
      const newPost = await this.postService.getPosts(postId);
      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('prolife/:userId')
  async getUserPosts(@Res() res: Response, @Param('userId') userId: string) {
    try {
      const posts = await this.postService.getUserProfPosts(userId);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('job/get')
  async getUserFeed(@Res() res: Response, @Request() req) {
    try {
      const user = await this.userService.findById(req.user.id);
      const posts = await this.postService.GetUsersInHome(user.id);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

}