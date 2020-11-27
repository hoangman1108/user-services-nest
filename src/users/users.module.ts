import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';
import { User, UserSchema } from './user.models';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    LoggerModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
