import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Schema as SchemaMg } from 'mongoose';
export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

