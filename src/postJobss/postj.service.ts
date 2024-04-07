import { Injectable, Post } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { PostDocument, PostJobs } from "src/Schema/postjop.schema";
import { CreateJob } from "./dtos/postjob.dtos";

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostJobs.name) private PostModel: Model<PostDocument>,
  ) {}

  async createPost(userId: string, post: CreateJob){
    try{
        const newPosts = new this.PostModel(post)
    newPosts.author = userId
    return newPosts.save()
    } catch(error) {
        throw error
    }
    
  } 

  async getUserProfPosts(userId:string): Promise<any[]>{
    try{
        const theposts = await this.PostModel
        .find({author:userId})
        .populate('author').sort({createdAt: -1}).exec()

        return theposts
    }catch(error) { 
        throw error
    }
  }

  async getPosts(postId:string){
    try{
        const theposts = await this.PostModel.findById(postId).populate('author')
        return theposts
    }catch(error) { 
        throw error
    }
  }


  async GetUsersInHome(userId: string[]): Promise<any[]> { 
    try {
        const posts = await this.PostModel.find()
        .where('author').sort({ createdAt: -1 }).exec();
        return posts;
      } catch (error) {
        throw error;
      }
  }

  async deletePost(postId: string, userId: string) {
    try {
      const foundPost = await this.PostModel.findById(postId);
      const deletedPost = await this.PostModel.findOneAndDelete({
        _id: postId,
        author: userId,
      });
      return deletedPost;
    } catch (error) {
      throw error;
    }
  }
}