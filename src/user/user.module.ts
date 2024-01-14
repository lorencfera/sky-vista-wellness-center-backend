import { Module, Post } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from '../Schema/auth.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PostJobs, PostSchema } from 'src/Schema/postjop.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: PostJobs.name, schema: PostSchema }]),
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
