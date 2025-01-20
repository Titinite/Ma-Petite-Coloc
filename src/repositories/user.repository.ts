import { UserModel, IUser } from "../databases/mongodb/user.model";

export class UserRepository {
  async findAll(): Promise<IUser[]> {
    return UserModel.find();
  }

  async findById(id: string): Promise<IUser | null> {
    return UserModel.findOne({ id });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email });
  }

  create(userData: Partial<IUser>): IUser {
    return new UserModel(userData);
  }

  async save(user: IUser): Promise<IUser> {
    return user.save();
  }

  async delete(userId: string): Promise<IUser | null> {
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    return deletedUser;
  }
}