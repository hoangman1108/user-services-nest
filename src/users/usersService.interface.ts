import { User } from './user.models'
import { UserDto } from './user.dto'
import { Iid, IUsers } from 'src/commons/common.interface'

export interface IUsersService {
  findUserById(id: Iid): Promise<User>;
  createUser(user: UserDto): Promise<User>;
  updateUser({ id, data }: { id: string, data: UserDto }): Promise<User>;
  listUsers(): Promise<IUsers<User>>;
}
