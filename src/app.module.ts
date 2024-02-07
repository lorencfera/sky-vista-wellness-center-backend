import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { PostModule } from './postJobss/postjob.module';
import { SearchModule } from './search/search.module';

@Module({
  imports:[
    MongooseModule.forRoot('mongodb+srv://lorenc:lorenc11@database.8pvrmdz.mongodb.net/?retryWrites=true&w=majority'),
    UserModule,
    AuthModule,
    PostModule,
    SearchModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
