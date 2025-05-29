import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from '../../db/user-entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(userDto: CreateUserDto) {
    try {
      const { email, name, password } = userDto;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = this.usersRepository.create({
        user_name: name,
        email: email,
        password: hashedPassword,
      });

      await this.usersRepository.save(user);
      const { password: _, ...result } = user;
      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<Users[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new NotFoundException({ error: error, message: 'Users not found' });
    }
  }

  async findById(id: number): Promise<Users | null> {
    try {
      return await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw new NotFoundException({ error: error, message: 'Users not found' });
    }
  }

  async findByAttributes(atr: Omit<CreateUserDto, "password">): Promise<Users | null> {
    try {
      return await this.usersRepository.findOne({
        where: [
          {email: atr.email},
          {user_name: atr.name},
        ],
      });
    } catch (error) {
      throw new NotFoundException({ error: error, message: 'Users not found' });
    }
  }
}
