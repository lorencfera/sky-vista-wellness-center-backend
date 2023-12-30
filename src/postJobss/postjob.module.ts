import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PostJobs, PostSchema } from '../Schema/postjop.schema';
import { PostService } from "./postj.service";
import { PostController } from "./postj.controller";
import { UserModule } from "src/user/user.module";
@Module({
    imports:[
    UserModule,
    MongooseModule.forFeature([{ name: PostJobs.name, schema: PostSchema }]),
    ],
    controllers: [PostController],
    providers: [PostService],
    exports: [PostService]
    
})
export class PostModule {}