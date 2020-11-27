import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { PinoLogger } from 'nestjs-pino';
import { IUsersService } from './usersService.interface';
// import { User, UserDocument } from './user.models';
import { Model, Connection } from 'mongoose';
import { UserDto } from './user.dto';
import { Iid, IUsers } from 'src/commons/common.interface';
import { User } from './user.models';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectModel(User.name)
    private userCollection: Model<User>,

    private readonly logger: PinoLogger
  ) {
    logger.setContext(UsersService.name)
  }
  listUsers(): Promise<IUsers<User>> {
    return this.userCollection.find().then((users)=>{
      if(users.length>0) return {
        users,
      };
      throw new Error('Get list user failed');
    })
  }
  createUser(user: UserDto): Promise<User> {
    return this.userCollection.create(user).then((result) => {
      if (result) return result;
      throw new Error('Create user failed');
    })
  }
  updateUser({ id, data }: { id: String, data: UserDto }): Promise<User> {
    return this.userCollection.findOneAndUpdate({ _id: id }, data, { new: true }).then((result) => {
      if (result) return result;
      throw new Error('Update user failed');
    })
  }
  async findUserById(id: Iid): Promise<User> {
    const result: User = await this.userCollection.findById(id.id);

    this.logger.info('UsersService#findUserById.result %o', result)

    return result
  }
}
