import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  private users = [
    {
      name: 'John Doe',
      id: 1,
      email: 'john.doe@example.com',
      role: 'INTERN',
    },
    {
      name: 'Jane Smith',
      id: 2,
      email: 'jane.smith@example.com',
      role: 'ENGINEER',
    },
    {
      name: 'Alice Johnson',
      id: 3,
      email: 'alice.johnson@example.com',
      role: 'ADMIN',
    },
    {
      name: 'Bob Brown',
      id: 4,
      email: 'bob.brown@example.com',
      role: 'INTERN',
    },
    {
      name: 'Eva Williams',
      id: 5,
      email: 'eva.williams@example.com',
      role: 'ENGINEER',
    },
    {
      name: 'Charlie Davis',
      id: 6,
      email: 'charlie.davis@example.com',
      role: 'ADMIN',
    },
    {
      name: 'Grace Taylor',
      id: 7,
      email: 'grace.taylor@example.com',
      role: 'INTERN',
    },
    {
      name: 'David Wilson',
      id: 8,
      email: 'david.wilson@example.com',
      role: 'ENGINEER',
    },
    {
      name: 'Sophie Miller',
      id: 9,
      email: 'sophie.miller@example.com',
      role: 'ADMIN',
    },
    {
      name: 'Michael Brown',
      id: 10,
      email: 'michael.brown@example.com',
      role: 'INTERN',
    },
  ];
  async findAll(roly?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (roly) {
      const users = await this.userModel.find({ role: roly });
      return users;
    }
    const users = await this.userModel.find();
    return users;
  }
  async findOne(id: string) {
    const users = await this.userModel.findOne({ _id: new mongoose.Types.ObjectId(id) });
    return users;
}
  async create(user: {
    name: string;
    email: string;
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  }) {
    const usersByHighestId = (await this.findAll()).length;
    const newUser = {
      id: usersByHighestId + 1,
      ...user,
    };
    const res=await this.userModel.create(newUser);
    // this.users.push(newUser);
    return res;
  }
  async update(
    id: string,
    updatedUser: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    const updatedOne=await this.userModel.updateOne({_id: id}, {$set: updatedUser});
    return updatedOne;
  }
  async delete(id: string) {
    const removedUser = await this.userModel.deleteOne({_id: id});
    return removedUser;
  }
}
