import { Controller, Inject } from '@nestjs/common';
import { User } from './user.models';
import { IUsersService } from './usersService.interface';
import { PinoLogger } from 'nestjs-pino';
import { GrpcMethod } from '@nestjs/microservices';
import { UserDto } from './user.dto';
import { Iid, IUsers } from 'src/commons/common.interface';
@Controller('users')
export class UsersController {
  constructor(@Inject('UsersService') private readonly service: IUsersService,
    private readonly logger: PinoLogger) {
    logger.setContext(UsersController.name)
  }

  @GrpcMethod('UsersService', 'createUser')
  async createUser(data: UserDto): Promise<User> {
    const result: User = await this.service.createUser(data)

    this.logger.info('UsersController#createUsercreateUsercreateUser.result %o', result)

    return result;
  }

  @GrpcMethod('UsersService', 'findUserById')
  async findUserById(id: Iid): Promise<User> {
    const result: User = await this.service.findUserById(id);
    this.logger.info('UsersController#findUserById.call %o', result);
    return result;
  }

  @GrpcMethod('UsersService', 'updateUser')
  async updateUser({ id, data }: { id: string, data: UserDto }): Promise<User> {
    console.log(data);
    const result: User = await this.service.updateUser({id, data});
    this.logger.info('UsersController#findUserById.call %o', result);
    return result;
  }

  @GrpcMethod('UsersService', 'listUsers')
  async listUsers(): Promise<IUsers<User>> {
    const results: IUsers<User> = await this.service.listUsers();
    this.logger.info('UsersController#findUserById.call %o', results);
    return results;
  }
}
