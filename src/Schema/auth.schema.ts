import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt'
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  firstname: string;

  @Prop({ unique: true })
  email: string;
  
  @Prop()
  password: string;

  @Prop()
  lastname: string;

  @Prop()
  uploadresume: string;

  @Prop({ type: String, unique: true })
  verificationToken: string;

  @Prop({ type: Boolean, default: false })
  verified: boolean;

  @Prop()
  conntactmethod: string;

  @Prop()
  contacttime: string; 

  @Prop()
  home: string;

  @Prop()
  work: string;

  @Prop({ type: String, unique: true })
  mobile: string;

  @Prop()
  employmenttype: string;

  @Prop()
  salarexpection: string;

  @Prop()
  whencanyoustart: string;

  @Prop()
  eduaction: string;

  @Prop()
  employment: string;
  @Prop()
  educationdegree: string;

  @Prop()
  specialization: string;
  @Prop()
  gradeGpa: string;

  @Prop()
  compleatedate: string;

  @Prop()
  Contactname: string;
  @Prop()
  country: string;

  @Prop()
  city: string;
  @Prop()
  zipcode: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

async function generateHash(password: string) {
  return bcrypt.hash(password, 12);
}


UserSchema.pre('save', function (next) {
  const user = this;
  if (user.isNew || user.isModified('password')) {
    return generateHash(user.password)
      .then((hash) => {
        user.password = hash;
        return next();
      })
      .catch((error) => {
        return next(error);
      });
  }
  return next();
});
