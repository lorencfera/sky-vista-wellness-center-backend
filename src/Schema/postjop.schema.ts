import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type PostDocument = PostJobs & Document;

@Schema({ timestamps: true })
export class PostJobs { 
    @Prop()
    nameofthejob: string
    @Prop()
    author: string
    @Prop()
    loaction: string
    @Prop()
    worktypes: string
    @Prop()
    fte: string
    @Prop()
    shift: string
    @Prop()
    hours: string
    @Prop()
    description: string
    @Prop()
    requrements: string
    @Prop()
    position: string
    @Prop()
    category: string
}

export const PostSchema = SchemaFactory.createForClass(PostJobs);