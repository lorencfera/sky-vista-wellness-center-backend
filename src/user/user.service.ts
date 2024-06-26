import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/Schema/auth.schema';
import { Model } from 'mongoose';
import { AuthUserDto } from './dtoss/auth.user.dto';
import { UpdateUserDto } from './dtoss/update.dto';
import { Types } from 'mongoose'
@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private UserModel: Model<UserDocument>,
    ){}

    async registrationofUser(users: AuthUserDto): Promise<User> { 
        const user =  new this.UserModel(users)
        const savedUser = await user.save();
        return savedUser;
    }

    async getByEmail(email: string): Promise<any> {
        try {
          const user = await this.UserModel.findOne({ email: email });
          return user;
        } catch (error) {
          throw error;
        }
      }

      async changeVerifyToTrue(userId: String) {
        try {
          const user = await this.UserModel.findById(userId);
          user.verified = true;
          return user.save();
        } catch (error) {
          throw error;
        }
      }

    
      async findById(id: string): Promise<any> {
        try {
          const user = await this.UserModel.findById(id);
          return user;
        } catch (error) {
          throw error;
        }
      }
      
      async updateUser(userId: string, user: UpdateUserDto): Promise<User> {
        try {
          const foundUser = await this.UserModel.findById(userId);
          foundUser.firstname = user.firstname || foundUser.firstname;
          foundUser.lastname = user.lastname || foundUser.lastname;
          foundUser.email = user.email || foundUser.email;
          foundUser.uploadresume = user.uploadresume || foundUser.uploadresume;
          foundUser.conntactmethod = user.conntactmethod || foundUser.conntactmethod;
          foundUser.contacttime = user.contacttime || foundUser.contacttime;
          foundUser.home = user.home || foundUser.home;
          foundUser.work = user.work || foundUser.work;
          foundUser.mobile = user.mobile || foundUser.mobile;
          foundUser.employmenttype = user.employmenttype || foundUser.employmenttype;
          foundUser.salarexpection = user.salarexpection || foundUser.salarexpection;
          foundUser.whencanyoustart = user.whencanyoustart || foundUser.whencanyoustart;
          foundUser.eduaction = user.eduaction || foundUser.eduaction;
          foundUser.employment = user.employment || foundUser.employment;
          foundUser.educationdegree = user.educationdegree || foundUser.educationdegree;
          foundUser.specialization = user.specialization || foundUser.specialization;
          foundUser.gradeGpa = user.gradeGpa || foundUser.gradeGpa;
          foundUser.compleatedate = user.compleatedate || foundUser.compleatedate;
          foundUser.Contactname = user.Contactname || foundUser.Contactname;
          foundUser.country = user.country || foundUser.country;
          foundUser.city = user.city || foundUser.city;
          foundUser.zipcode = user.zipcode || foundUser.zipcode;
          foundUser.password = user.password || foundUser.password;
          if (foundUser.email !== user.email) {
            foundUser.email = user.email;
            foundUser.verified = false;
          }
          const f = await foundUser.save();
          console.log(f)
          return f
        } catch (error) {
          throw error;
        }
      }

      async JobSave(userid: string, jobid: string) { 
        try {
          const user = await this.UserModel.findById(userid);
      
          if (!user) {
            console.log(`User with ID ${jobid} not found.`);
            return;
          }
      
          if (!user.savesJob.includes(jobid)) {
            await user.updateOne({ $push: { savesJob: jobid } });
            console.log(`Job ${jobid} saved successfully for user ${user._id}`);
          } else {
            console.log(`Job ${jobid} is already saved for user ${user._id}`);
          }
        } catch (error) {
          console.error(`Error saving job ${jobid}: ${error.message}`);
        }
      }
      
      

      async getjob(userid: string) {
        try {
            const user = await this.UserModel.findById(userid);
            
    
            if (!user) {
                throw new Error(`User with ID ${userid} not found.`);
            }
    
            console.log(`User savesJob: ${JSON.stringify(user.savesJob)}`);
    
            const jobs = await this.UserModel.find({ _id: { $in: user.savesJob } });
            console.log(`Jobs: ${JSON.stringify(jobs)}`);

            return user.savesJob;
        } catch (error) {
            console.error(`Error in getjob: ${error.message}`);
            throw error;
        }
    }

    async getUsers(userIds: string[]): Promise<any[]> {
      try {
        const user = await this.UserModel.find()
        .where('_id').sort({ createdAt: -1 }).exec();
        return user;
      } catch (error) {
        throw error;
      }
    }
}
