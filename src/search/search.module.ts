import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostJobs, PostSchema } from 'src/Schema/postjop.schema';
import { User, UserSchema } from 'src/Schema/auth.schema';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PostJobs.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}