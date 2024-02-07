import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostJobs, PostDocument } from 'src/Schema/postjop.schema';
import { User, UserDocument } from 'src/Schema/auth.schema';
@Injectable()
export class SearchService {
  constructor(
    @InjectModel(PostJobs.name) private PostModel: Model<PostDocument>,
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
  ) {}

  async searchUsers(searchQuery: string) {
    try {
      let searchRes = await this.UserModel.find({
        firstname: new RegExp(searchQuery, 'i'),
      });
      return searchRes;
    } catch (error) {
      throw error;
    }
  }

  async searchPosts(searchQuery: string) {
    try {
      let searchRes = await this.PostModel.find({
        nameofthejob: new RegExp(searchQuery, 'i'),
      })
        .populate('author')
      return searchRes;
    } catch (error) {
      throw error;
    }
  }
}